import {View, Text, ViewStyle, TextStyle, Pressable} from 'react-native';
import React from 'react';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '.';
type Props = {
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  touchableOpacityStyle?: ViewStyle;
  color?: string;
};
const ButtonBack: React.FC<Props> = ({
  title = 'Retour',
  disabled = false,
  loading = false,
  onPress,
  containerStyle,
  color = '#082F70',
}): JSX.Element => {
  return (
    <Pressable
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: 'auto',
        ...containerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={{
          marginVertical: 'auto',
          width: 18,
          height: 18,
        }}>
        <svg.Icons iconName="arrow_chevron_left_md" stroke={color} />
      </View>
      <Text
        style={{
          ...components.Typography.BodyM,
          color: color,
          lineHeight: 18,
          fontWeight: 600,
          marginVertical: 'auto',
        }}>
        Retour
      </Text>
    </Pressable>
  );
};
export default React.memo(ButtonBack);
