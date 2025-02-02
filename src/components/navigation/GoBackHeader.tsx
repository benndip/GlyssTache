import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {theme} from '../../constants/colors';
import Icons from '../../assets/svg/Icons';
import {components} from '..';
import {useNavigation} from '@react-navigation/native';
import {spaces} from '../../constants/spaces';

export default function GoBackHeader({outlined = false}: {outlined?: boolean}) {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.row,
        styles.container,
        {
          backgroundColor: outlined
            ? theme.colors.background
            : theme.colors.primary,
        },
      ]}>
      <Pressable
        style={[styles.row, styles.backButton]}
        onPress={() => navigation.goBack()}>
        <Icons
          iconName="arrow_chevron_left"
          stroke={outlined ? theme.colors.primary : theme.colors.grayLite}
        />
        <Text
          style={[
            components.Typography.CTA_S,
            {color: outlined ? theme.colors.primary : theme.colors.grayLite},
          ]}>
          Retour
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.md,
    height: 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    gap: spaces.sm2,
    padding: spaces.xs,
  },
});
