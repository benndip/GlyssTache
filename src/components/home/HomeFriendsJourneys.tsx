import {View, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {theme} from '../../constants';
import {BodyL, H2, H3} from '../Typography';
import Row from '../../custom/Row';
import {spaces} from '../../constants/spaces';
import {shadowStyle} from '../../constants/shadow';
import Social from '../../assets/svg/Social';
import Button from '../Button';
import {SocialCardExample} from '../SocialCard/SocialCard.example';

export default function HomeFriendsJourneys() {
  const randomNumberBetween = (min: number, max: number) => {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    return n;
  };
  const shouldDisplayCard = useMemo(
    () => randomNumberBetween(0, 10) % 2 === 0,
    [],
  );

  return (
    <View style={styles.container}>
      <Row style={styles.titleRow}>
        <View style={styles.socialIcon}>
          <Social />
        </View>
        <H2
          style={{
            color: theme.colors.blackBodyText,
          }}>
          Trajets de vos amis
        </H2>
      </Row>
      {shouldDisplayCard ? (
        <SocialCardExample />
      ) : (
        <View style={styles.content}>
          <H3 style={{color: theme.colors.primary}}>Nouveau sur l'app ?</H3>
          <BodyL style={{marginBottom: spaces.lg}}>
            Abonne toi aux passionnés de la montagne et retrouve ici les
            derniers trajets publiés
          </BodyL>
          <Button iconForward title="Ajouter des amis" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spaces.xxl,
    paddingHorizontal: spaces.md,
  },
  titleRow: {
    gap: spaces.sm2,
    marginBottom: spaces.md,
    width: '100%',
  },
  content: {
    gap: spaces.md,
    padding: spaces.md,
    paddingVertical: spaces.lg,
    backgroundColor: theme.colors.grayLite,
    borderRadius: 16,
    ...shadowStyle.shadowContainer,
  },
  socialIcon: {
    backgroundColor: theme.colors.grayLite,
    height: 48,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
