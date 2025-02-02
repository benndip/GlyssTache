import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {components} from './src/components';
import {persistor, store} from './src/store';
import {enableScreens} from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import {PersistGate} from 'redux-persist/integration/react';
import StackNavigator from './src/navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {initGeolocation} from './src/utils/geolocation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

enableScreens();

const App = () => {
  useEffect(() => {
    initGeolocation();
    Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<components.Loader />} persistor={persistor}>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </PersistGate>
          <components.AppState />
        </Provider>
      </GestureHandlerRootView>
      <Toast topOffset={56} />
    </SafeAreaProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
