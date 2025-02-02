import {View, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';

export default function Divider({style}: {style?: ViewStyle}) {
  return (
    <View
      style={[
        {height: 1, width: '100%', backgroundColor: colors.border},
        style,
      ]}
    />
  );
}
