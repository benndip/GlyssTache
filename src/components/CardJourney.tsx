import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Row from '../custom/Row';
import Divider from './Divider';
import {secondsToHours} from '../utils/minuteToHours';
import {colors} from '../constants/colors';
import {shadowStyle} from '../constants/shadow';
import Typography from './Typography';
import DifficultyIndicator from '../assets/svg/DifficultyIndicator';
import {theme} from '../constants';

type Props = {
  difficulty: number;
  domainName: string;
  duration: number;
  distance: number;
  skiSlopes: number[];
};
export default function CardJourney({
  difficulty,
  domainName,
  duration,
  distance,
  skiSlopes,
}: Props) {
  const difficulties = ['Débutant', 'Intermédiaire', 'Expert'];
  const difficultyColor = [
    colors.greenSlope,
    colors.blueSlope,
    colors.redSlope,
  ];

  return (
    <TouchableOpacity style={[shadowStyle.shadowContainer, styles.container]}>
      <Row style={{gap: 16}}>
        <Row
          style={{
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text style={Typography.LabelM}>DURÉE</Text>
          <Text style={Typography.Titleh2}>{secondsToHours(duration)}</Text>
        </Row>
        <View style={styles.verticalDivider} />
        <Row
          style={{
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text style={Typography.LabelM}>DISTANCE(KM)</Text>
          <Text style={Typography.Titleh2}>{distance}</Text>
        </Row>
      </Row>
      <Divider />
      <Row style={{gap: 8, overflow: 'hidden', alignItems: 'center'}}>
        <Text style={Typography.LabelS}>Pistes ({skiSlopes?.length})</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 4}}>
          {skiSlopes?.slice(0, 10).map((slope, index) => (
            <View
              key={index}
              style={{
                backgroundColor: difficultyColor[slope - 1],
                aspectRatio: 1,
                height: 15,
                borderRadius: 100,
              }}
            />
          ))}
          {skiSlopes?.length > 10 && (
            <Text style={[Typography.LabelS, {textAlignVertical: 'bottom'}]}>
              +{skiSlopes.length - 10}
            </Text>
          )}
        </ScrollView>
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: colors.grayLite,
    borderRadius: 16,
    gap: 16,
  },
  difficulty: {
    ...Typography.LabelS,
  },
  title: {
    lineHeight: 20,
    fontSize: 18,

    fontFamily: theme.fonts.DM_Sans_700Regular,
    fontWeight: 'bold',

    color: colors.primary,
  },

  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.border,
  },
});
