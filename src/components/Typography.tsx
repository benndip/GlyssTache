import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {theme} from '../constants';

const styles = StyleSheet.create({
  DisplayL: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.34,
  },
  DisplayM: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.28,
  },
  DisplayS: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.26,
  },
  Titleh1: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30.8,
    letterSpacing: -0.28,
  },
  Titleh2: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26.4,
    letterSpacing: -0.24,
  },
  Titleh3: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24.2,
  },
  Titleh4: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  BodyL: {
    fontFamily: theme.fonts.DM_Sans_500Regular,
    color: theme.colors.grayDark,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23.44,
  },
  BodyM: {
    fontFamily: theme.fonts.DM_Sans_400Regular,
    color: theme.colors.grayDark,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.066,
  },
  BodyS: {
    fontFamily: theme.fonts.DM_Sans_400Regular,
    color: theme.colors.grayDark,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.066,
  },
  CTA_L: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
  },
  CTA_M: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0,
  },
  CTA_S: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.blackBodyText,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 14,
    letterSpacing: 0,
  },
  LabelM: {
    fontFamily: theme.fonts.DM_Sans_600Regular,
    color: theme.colors.grayDark,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 15,
    letterSpacing: 0.066,
  },
  LabelTAG: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.grayDark,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  LabelS: {
    fontFamily: theme.fonts.DM_Sans_700Regular,
    color: theme.colors.grayDark,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  LabelBottomBar: {
    fontFamily: theme.fonts.DM_Sans_500Regular,
    color: theme.colors.grayDark,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 13.2,
    letterSpacing: 0.24,
  },
});
// Base text component type with optional style override
interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextProps['style'];
}

// Helper function to create text components
const createTextComponent = (baseStyle: any) => {
  return ({children, style, ...props}: BaseTextProps) => (
    <Text style={[baseStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const DisplayL = createTextComponent(styles.DisplayL);
export const DisplayM = createTextComponent(styles.DisplayM);
export const DisplayS = createTextComponent(styles.DisplayS);
export const H1 = createTextComponent(styles.Titleh1);
export const H2 = createTextComponent(styles.Titleh2);
export const H3 = createTextComponent(styles.Titleh3);
export const H4 = createTextComponent(styles.Titleh4);
export const BodyL = createTextComponent(styles.BodyL);
export const BodyM = createTextComponent(styles.BodyM);
export const BodyS = createTextComponent(styles.BodyS);
export const CTAL = createTextComponent(styles.CTA_L);
export const CTAM = createTextComponent(styles.CTA_M);
export const CTAS = createTextComponent(styles.CTA_S);
export const LabelM = createTextComponent(styles.LabelM);
export const LabelTag = createTextComponent(styles.LabelTAG);
export const LabelS = createTextComponent(styles.LabelS);
export const LabelBottomBar = createTextComponent(styles.LabelBottomBar);
export default styles;
