import React from 'react';
import {Text, TextStyle, Platform} from 'react-native';
import {components} from '../components';
import {theme} from '../constants';
type Props = {
  style?: object;
  children: React.ReactNode;
  numberOfLines?: number;
};
const T14: React.FC<Props> = ({
  children,
  numberOfLines,
  style,
}): JSX.Element => {
  return (
    <Text
      style={{
        ...components.Typography.BodyS,
        color: theme.colors.onBackground,
        ...style,
      }}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
export default T14;
