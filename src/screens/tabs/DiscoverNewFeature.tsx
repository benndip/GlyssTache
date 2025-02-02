import React from 'react';
import {spaces} from '../../constants/spaces';
import {BodyL, BodyS, H2} from '../../components/Typography';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import HourglassSvg from '../../assets/svg/HourGlass';
import {theme} from '../../constants/colors';
import Icons from '../../assets/svg/Icons';

export default function DiscoverNewFeature() {
  return (
    <ImageBackground
      source={require('../../assets/images/BG-top-illustration.png')}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.svgContainer}>
          <HourglassSvg />
        </View>
        <View style={styles.titleContainer}>
          <H2 style={styles.title}>Bientôt, Glyss sera bien plus qu'une app</H2>
        </View>
        <View style={styles.textContainer}>
          <BodyL style={{color: theme.colors.grayLite}}>
            Chez Glyss, on sait que quand tu es au ski, tu n’as pas envie d’être
            sur ton téléphone.
          </BodyL>
          <BodyL style={{color: theme.colors.grayLite}}>
            C’est pourquoi on a conçu une solution pour que tu puisses vraiment
            déconnecter.
          </BodyL>
          <BodyL style={{color: theme.colors.grayLite}}>
            Dès l'année prochaine, ton compagnon préféré va évoluer, alors
            active les notifications (si ce n’est pas déjà fait) pour rester
            informé.
          </BodyL>
        </View>

        <View style={styles.notificationContainer}>
          <Icons
            iconName="interface_check_all"
            stroke={theme.colors.grayLite}
          />
          <BodyS style={{color: theme.colors.grayLite}}>
            Tu seras informé dès que la solution sort
          </BodyS>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.md,
    alignItems: 'center',
  },
  svgContainer: {
    marginTop: spaces.xl,
    marginBottom: 50,
  },
  title: {
    color: theme.colors.grayLite,
    marginBottom: spaces.sm2,
  },
  textContainer: {
    gap: spaces.sm2,
  },
  notificationContainer: {
    alignItems: 'center',
    marginTop: spaces.xxl,
    gap: spaces.sm,
  },
  titleContainer: {
    width: '100%',
  },
});
