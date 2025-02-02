import {StyleSheet, View} from 'react-native';
import React from 'react';
import JourneySuggestion from '../JourneySuggestion';
import {Journey} from '../../types/ForYou';
import Button from '../Button';
import {spaces} from '../../constants/spaces';

export default function HomeJourneySuggestion({
  onPress,
  item,
}: {
  onPress: () => void;
  item: Journey;
}) {
  return (
    <JourneySuggestion
      style={styles.container}
      {...item}
      disabled
      additionalData={
        <View style={{gap: spaces.md}}>
          <Button title={'Démarrer mon trajet'} onPress={onPress} iconForward />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: spaces.md,
    borderBottomWidth: 1,
    height: 1,
  },
  container: {
    width: 350,
  },
});
