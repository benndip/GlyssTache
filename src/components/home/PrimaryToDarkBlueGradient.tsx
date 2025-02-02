import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {theme} from '../../constants/colors';
import {spaces} from '../../constants/spaces';

export default function PrimaryToDarkBlueGradient({
  children,
  style,
  colors,
  ...props
}: Partial<LinearGradientProps>) {
  return (
    <LinearGradient
      colors={colors || [theme.colors.primary, theme.colors.secondary]}
      style={[styles.container, style]}
      {...props}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spaces.xxl,
    paddingHorizontal: spaces.md,
  },
});
