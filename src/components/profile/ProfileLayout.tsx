import {ScrollView, ScrollViewProps, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import {H2} from '../Typography';
import {spaces} from '../../constants/spaces';
import {theme} from '../../constants/colors';

type ProfileLayoutProps = {
  title: string;
  titleStyle?: TextStyle;
} & ScrollViewProps;
export default function ProfileLayout({
  title,
  contentContainerStyle,
  style,
  titleStyle,
  children,
  ...props
}: ProfileLayoutProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      {...props}>
      <H2 style={[styles.title, titleStyle]}>{title}</H2>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingHorizontal: spaces.md,
  },
  title: {
    marginVertical: spaces.xxl,
  },
});
