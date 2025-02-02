import {View, ViewProps} from 'react-native';
import React from 'react';

export default function Row({style, ...props}: ViewProps) {
  return (
    <View
      style={[{flexDirection: 'row', alignItems: 'center'}, style]}
      {...props}
    />
  );
}
