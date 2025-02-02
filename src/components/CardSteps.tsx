import React from 'react';
import {PropsWithChildren} from 'react';
import {View, ViewStyle, Text, Pressable} from 'react-native';
import {theme} from '../constants';
import {colors} from '../constants/colors';
import {svg} from '../assets/svg';
import Typography from './Typography';
import {debug} from '../utils/debug';

type Props = PropsWithChildren<{
  item?: any;
  containerStyle?: ViewStyle;
}>;
const CardSteps: React.FC<Props> = ({item, containerStyle}) => {
  const typeOptions = {
    easy: theme.colors.greenSlope,
    novice: theme.colors.greenSlope,
    intermediate: theme.colors.blueSlope,
    advanced: theme.colors.redSlope,
    expert: theme.colors.blackSlope,
    drag_lift: 'telesiege',

    //todo icons
    chair_lift: 'chair_lift',
    magic_carpet: 'Circle',
    rope_tow: 'Circle',
    platter: 'Circle',
    't-bar': 'Circle',
    'j-bar': 'Circle',
    mixed_lift: 'Circle',
    gondola: 'Circle',
    cable_car: 'Circle',
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16,
        padding: 16,
        borderRadius: 16,
        ...theme.shadowStyle.shadowContainer,
        ...containerStyle,
      }}>
      <View style={{marginVertical: 'auto', width: 24}}>
        {['novice', 'easy', 'intermediate', 'advanced', 'expert'].includes(
          item.type,
        ) ? (
          <View
            style={{
              backgroundColor: typeOptions[item.type],
              aspectRatio: 1,
              height: 24,
              borderRadius: 100,
            }}
          />
        ) : (
          <svg.Icon iconName={typeOptions[item.type]} stroke="#006605" />
        )}
      </View>
      <View>
        <View
          style={{
            gap: 16,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              ...Typography.BodyM,
            }}>
            {item.name}
          </Text>
        </View>
        <View style={{marginVertical: 'auto', paddingTop: 8}}>
          <Text
            style={{
              ...Typography.Titleh4,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 18,
            }}>
            {item.duration} min.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CardSteps;
