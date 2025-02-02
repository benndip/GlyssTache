import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableOpacityProps,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';

import Row from '../custom/Row';
import Divider from './Divider';
import {secondsToHours} from '../utils/minuteToHours';
import {colors} from '../constants/colors';
import {shadowStyle} from '../constants/shadow';
import DifficultyIndicator from '../assets/svg/DifficultyIndicator';
import {theme} from '../constants';
import {Journey} from '../types/ForYou';
import {BodyM, H4, LabelS} from './Typography';
import {spaces} from '../constants/spaces';
import Icons from '../assets/svg/Icons';

export default function JourneySuggestion({
  difficulty,
  name,
  duration,
  distance,
  slope_list,
  additionalData,
  availableOffline,
  style,
  ...props
}: Omit<Journey, 'id'> &
  TouchableOpacityProps & {
    additionalData?: ReactNode;
    availableOffline?: boolean;
  }) {
  const difficulties = {
    NOVICE: 'Novice',
    BEGINNER: 'Débutant',
    INTERMEDIATE: 'Intermédiaire',
    EXPERIENCED: 'Expert',
    ADVANCED: 'Advanced',
  };

  const difficultyColor = {
    novice: colors.greenSlope,
    easy: colors.blueSlope,
    intermediate: colors.redSlope,
    expert: colors.secondary,
    advanced: colors.secondary,
  };

  const distanceInKilometers = useMemo(
    () => (distance / 1000).toFixed(3).toString().replace('.', ','),
    [distance],
  );

  return (
    <TouchableOpacity
      style={[shadowStyle.shadowContainer, styles.container, style]}
      {...props}>
      <Row style={styles.difficultyRow}>
        <LabelS>{difficulties[difficulty]}</LabelS>
        <Row style={styles.indicatorRow}>
          {Object.keys(difficulties).map((level, index) => (
            <DifficultyIndicator
              key={level}
              filled={Object.keys(difficulties).indexOf(difficulty) >= index}
            />
          ))}
        </Row>
      </Row>
      {availableOffline && (
        <Row style={styles.offlineRow}>
          <Icons iconName="warning_circle_check" stroke="#505C70" />
          <BodyM style={{fontStyle: 'italic'}}>
            Trajet accessible hors ligne
          </BodyM>
        </Row>
      )}
      <Text style={styles.title}>{name}</Text>
      <Divider />
      <Row style={styles.metricsRow}>
        <Row style={styles.duration}>
          <LabelS>DURÉE </LabelS>
          <H4>{secondsToHours(duration)}</H4>
        </Row>
        <View style={styles.verticalDivider} />
        <Row style={styles.distance}>
          <LabelS>DISTANCE(KM)</LabelS>
          <H4>{distanceInKilometers}</H4>
        </Row>
      </Row>
      <Divider />
      <Row style={styles.slopesContainer}>
        <LabelS>Pistes ({slope_list?.length ?? 0})</LabelS>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {slope_list?.slice(0, 10).map((slope, index) => (
            <View
              key={index}
              style={[
                styles.slopeIndicator,
                {
                  backgroundColor:
                    difficultyColor[
                      slope?.difficulty?.toLowerCase() as keyof typeof difficultyColor
                    ] ?? difficultyColor.novice,
                },
              ]}
            />
          ))}
          {slope_list?.length > 10 && (
            <LabelS style={styles.remainingSlopes}>
              +{(slope_list?.length ?? 0) - 10}
            </LabelS>
          )}
        </ScrollView>
      </Row>
      {additionalData}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.lg,
    backgroundColor: colors.grayLite,
    borderRadius: 16,
    gap: spaces.md,
    width: 350,
  },
  title: {
    lineHeight: 20,
    fontSize: 18,
    fontFamily: theme.fonts.DM_Sans_700Regular,
    fontWeight: 'bold',
    color: colors.primary,
  },
  duration: {
    gap: spaces.xs,
    alignItems: 'baseline',
    flex: 1,
  },
  offlineRow: {
    gap: spaces.xs,
  },
  distance: {
    gap: spaces.xs,
    alignItems: 'baseline',
    flex: 2,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.border,
  },
  difficultyRow: {
    gap: 8,
  },
  indicatorRow: {
    gap: 2,
  },
  metricsRow: {
    gap: spaces.md,
  },
  slopesContainer: {
    gap: spaces.sm,
    overflow: 'hidden',
    alignItems: 'center',
  },
  scrollViewContent: {
    gap: spaces.xs,
  },
  slopeIndicator: {
    aspectRatio: 1,
    height: 15,
    borderRadius: 100,
  },
  remainingSlopes: {
    textAlignVertical: 'bottom',
  },
});
