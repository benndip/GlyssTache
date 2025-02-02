import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '../constants/colors';
const Loader: React.FC = (): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.onPrimaryContainer} />
    </View>
  );
};
export default Loader;
