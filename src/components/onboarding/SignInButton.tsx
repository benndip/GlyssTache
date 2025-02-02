import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {BodyM} from '../Typography';
import {utils} from '../../utils';
import {theme} from '../../constants';
import {spaces} from '../../constants/spaces';

export default function SignInButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.container}>
      <View style={styles.transparentBorder}>
        <BodyM style={styles.transparentBorder} numberOfLines={1}>
          Déjà un compte ?
        </BodyM>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.primaryBottomBorder}>
          <BodyM style={styles.primaryText} numberOfLines={1}>
            Je me connecte
          </BodyM>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: utils.responsiveHeight(20),
    gap: spaces.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  transparentBorder: {
    borderTopColor: theme.colors.transparent,
    borderBottomColor: theme.colors.transparent,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  primaryBottomBorder: {
    borderTopColor: theme.colors.transparent,
    borderBottomColor: theme.colors.primary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  primaryText: {
    color: theme.colors.primary,
  },
});
