import React from 'react';
import {components} from '..';
import {utils} from '../../utils';
import {StyleSheet} from 'react-native';

export default function SignUpButton({onPress}: {onPress: () => void}) {
  return (
    <components.Button
      title="Je suis nouveau, je m'inscris"
      iconForward={true}
      onPress={onPress}
      touchableOpacityStyle={{width: 'auto', paddingHorizontal: 30}}
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: utils.responsiveHeight(20),
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
});
