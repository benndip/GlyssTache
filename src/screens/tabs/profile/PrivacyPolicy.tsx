import React, {useReducer} from 'react';
import {StyleSheet, Switch, View} from 'react-native';

import ProfileLayout from '../../../components/profile/ProfileLayout';
import {theme} from '../../../constants';
import {BodyS, H3} from '../../../components/Typography';
import Divider from '../../../components/Divider';
import Row from '../../../custom/Row';
import {spaces} from '../../../constants/spaces';
import Button from '../../../components/Button';
import Icons from '../../../assets/svg/Icons';

export default function PrivacyPolicy() {
  const [addActive, toggleAddActive] = useReducer(
    (value: boolean) => !value,
    false,
  );
  const [ghostMode, toggleGhostMode] = useReducer(
    (value: boolean) => !value,
    false,
  );
  return (
    <ProfileLayout title="Confidentialité">
      <View style={styles.section}>
        <H3>Personnaliser les publicités</H3>
        <Divider style={styles.divider} />
        <Row style={styles.container}>
          <Switch
            value={addActive}
            onValueChange={toggleAddActive}
            trackColor={{
              false: theme.colors.handleIndicator,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.grayLite}
          />
          <BodyS>{addActive ? 'Activé' : 'Désactivé'}</BodyS>
        </Row>
        <Divider style={styles.divider} />
        <BodyS>
          Vous pouvez personnaliser les publicités que vous voyez en activant ou
          désactivant les options ci-dessous.
        </BodyS>
      </View>
      <View style={styles.section}>
        <H3>Visibilité sur la carte</H3>
        <Divider style={styles.divider} />
        <Row style={styles.container}>
          <Switch
            value={ghostMode}
            onValueChange={toggleGhostMode}
            trackColor={{
              false: theme.colors.handleIndicator,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.grayLite}
          />
          <BodyS>Mode invisible {ghostMode ? 'activé' : 'désactivé'}</BodyS>
        </Row>
        <Divider style={styles.divider} />
        <BodyS>
          Vous pouvez personnaliser la visibilité de votre profil sur la carte
          en activant ou désactivant le mode invisible.
        </BodyS>
      </View>

      <View style={styles.section}>
        <H3>Historique de navigation</H3>
        <Button
          // @ts-ignore
          containerStyle={{...styles.divider, borderRadius: 16}}
          touchableOpacityStyle={styles.buttonTouchableOpacity}
          title="Historique de navigation"
          iconLeft={<Icons iconName="file_archive" />}
          iconForward
          variant="secondary"
        />
        <BodyS>
          Leo sit mi auctor tincidunt venenatis ultricies vel aliquam. Integer
          hac ornare ultricies pellentesque. Pellentesque ultrices pellentesque
          ornare hac sed diam blandit sollicitudin tortor.
        </BodyS>
      </View>
    </ProfileLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spaces.md,
    gap: spaces.md,
  },
  divider: {
    marginVertical: spaces.sm,
  },
  section: {
    marginBottom: spaces.xxl,
  },
  buttonTouchableOpacity: {
    borderRadius: 16,
    backgroundColor: 'pink',
    justifyContent: 'space-between',
    paddingHorizontal: spaces.md,
  },
});
