import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {screens} from '../screens';
import {RootStack} from './RootStack';
import {useAppSelector} from '../store';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import Location from '../screens/tabs/Location';
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<Navigation>();
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
const StackNavigator: React.FC = () => {
  const user = useAppSelector(state => state.authSlice.user);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootStack.Navigator>
        {/* IF USER IS LOGGED OUT */}
        {!user && (
          <RootStack.Group>
            <RootStack.Screen
              name="Onboarding"
              component={screens.Onboarding}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="SignInEmail"
              component={screens.SignInEmail}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="SignInPassword"
              component={screens.SignInPassword}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="SignUpEmail"
              component={screens.SignUpEmail}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="SetPassword"
              component={screens.SetPassword}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="VerifyOtpEmail"
              component={screens.VerifyOtpEmail}
              options={{headerShown: false}}
            />
          </RootStack.Group>
        )}
        {/* IF USER IS LOGGED IN */}
        {user && (
          <RootStack.Group>
            <RootStack.Group>
              <RootStack.Screen
                name="TabNavigator"
                component={screens.TabNavigator}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="SignUpDetails"
                component={screens.SignUpDetails}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="LogOut"
                component={screens.LogOut}
                options={{headerShown: false}}
              />
            </RootStack.Group>

            <RootStack.Group screenOptions={{presentation: 'modal'}}>
              <RootStack.Screen
                name="LocationModal"
                component={Location}
                options={{headerShown: false}}
              />
            </RootStack.Group>
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </QueryClientProvider>
  );
};
export default StackNavigator;
