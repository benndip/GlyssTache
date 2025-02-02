import React from 'react';
import {Text, TextStyle, Platform} from 'react-native';
import {components} from '../components';
import {theme} from '../constants';
type Props = {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
};
const T16: React.FC<Props> = ({children, style, numberOfLines}) => {
  return (
    <Text
      style={{
        ...components.Typography.BodyM,
        color: theme.colors.onBackground,
        ...style,
      }}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
export default T16;
