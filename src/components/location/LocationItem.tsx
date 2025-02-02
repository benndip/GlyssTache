import {spaces} from '../../constants/spaces';
import {View, StyleSheet, Pressable, TextStyle, ViewStyle} from 'react-native';
import {theme} from '../../constants/colors';
import React from 'react';
import {BodyM} from '../Typography';
import Icons from '../../assets/svg/Icons';

type Props = {
  onPress: () => void;
  iconDisplayed?: boolean;
  iconName?: string;
  title: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export default function LocationItem({
  onPress,
  iconDisplayed = true,
  iconName,
  title,
  textStyle,
  containerStyle,
}: Props) {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      {iconDisplayed && (
        <View>
          <Icons iconName={iconName as string} />
        </View>
      )}
      <BodyM style={textStyle}>{title}</BodyM>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: spaces.md,
    alignItems: 'center',
    gap: spaces.md,
    flexDirection: 'row',
    backgroundColor: theme.colors.grayLite,
    borderWidth: 1,
    borderColor: theme.colors.transparent,
  },
});
