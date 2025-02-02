import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {theme} from '../constants';
import {components} from '../components';
import {svg} from '../assets/svg';
import {DisplayM, H4, LabelM} from './Typography';
import {spaces} from '../constants/spaces';

type Props = {
  containerStyle?: ViewStyle;
};

const CardStation: React.FC<Props> = ({containerStyle}): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <svg.Icon iconName="station" stroke={'#003A9B'} />
            </View>
          </View>
          <View style={styles.titleWrapper}>
            <H4>La station</H4>
          </View>
        </View>

        <View style={styles.timeBoxesContainer}>
          {/* Opening hours box */}
          <View style={styles.timeBox}>
            <View style={styles.iconBox}>
              <svg.Icon
                iconName="clock"
                stroke={'#003A9B'}
                SvgProps={{
                  fill: 'none',
                  style: styles.timeBoxIcon,
                }}
              />
            </View>
            <View style={styles.timeTextContainer}>
              <DisplayM>8h</DisplayM>
              <LabelM>Ouverture</LabelM>
            </View>
          </View>

          {/* Closing hours box */}
          <View style={styles.timeBox}>
            <View style={styles.iconBox}>
              <svg.Icon
                iconName="piste fermé"
                stroke={'#FF2D55'}
                SvgProps={{
                  fill: 'none',
                  style: styles.timeBoxIcon,
                }}
              />
            </View>
            <View style={styles.timeTextContainer}>
              <DisplayM>16h</DisplayM>
              <LabelM>Fermeture</LabelM>
            </View>
          </View>
        </View>

        <components.Button
          iconForward={true}
          touchableOpacityStyle={styles.button}
          title={'Voir le plan des pistes'}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...theme.shadowStyle.shadowContainer,
  },
  card: {
    width: '100%',
    paddingVertical: spaces.lg,
    paddingHorizontal: spaces.md,
    gap: spaces.lg,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: spaces.md,
  },
  iconContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: theme.colors.background + 90,
    marginVertical: 'auto',
  },
  iconWrapper: {
    margin: 'auto',
  },
  titleWrapper: {
    display: 'flex',
    marginVertical: 'auto',
  },
  timeBoxesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: spaces.md,
  },
  timeBox: {
    padding: spaces.sm2,
    display: 'flex',
    margin: 'auto',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spaces.md,
    backgroundColor: theme.colors.background + 90,
    height: 144,
    width: 'auto',
    flex: 1,
    borderRadius: 16,
  },
  iconBox: {
    paddingTop: 10,
    display: 'flex',
    margin: 'auto',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spaces.xxs,
  },
  timeBoxIcon: {
    display: 'flex',
    marginVertical: 'auto',
    width: 32,
    height: 32,
  },
  timeTextContainer: {
    display: 'flex',
    margin: 'auto',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spaces.xxs,
  },
  button: {
    paddingHorizontal: spaces.md,
    width: '100%',
  },
});

export default CardStation;
