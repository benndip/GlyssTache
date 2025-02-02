import React from 'react';
import {PropsWithChildren} from 'react';
import {View, ViewStyle, Text} from 'react-native';
import {svg} from '../assets/svg';
import {theme} from '../constants';
type Props = PropsWithChildren<{
  containerStyle?: ViewStyle;
  children?: React.ReactNode;
}>;
const Header: React.FC<Props> = ({containerStyle, children}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 32,
          fontWeight: 'bold',
          flex: 1,
          textAlign: 'center',
          margin: 'auto',
        }}>
        Glyss
      </Text>
      <View
        style={{
          margin: 'auto',
        }}>
        <svg.Icon iconName="parametre" stroke={theme.colors.onPrimary} />
      </View>
    </View>
  );
};
export default Header;
