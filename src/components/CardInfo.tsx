import React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {theme} from '../constants';
import {components} from '../components';
import {svg} from '../assets/svg';
import {BodyL, H4} from './Typography';
import {spaces} from '../constants/spaces';
type Props = {
  containerStyle?: ViewStyle;
  onPress?: () => void;
};

const CardInfo: React.FC<Props> = ({containerStyle, onPress}): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <svg.Icon iconName="app futur" stroke={'#003A9B'} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <H4>Bientôt, Glyss sera bien plus qu'une app</H4>
          </View>
        </View>
        <View>
          <BodyL>
            En attendant, laisse toi guider par nos instructions sonores
          </BodyL>
        </View>
        <components.Button
          iconForward={true}
          touchableOpacityStyle={styles.button}
          title={'Découvrir la nouvelle solution'}
          onPress={onPress}
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
  contentContainer: {
    width: '100%',
    paddingVertical: spaces.lg,
    paddingHorizontal: spaces.md,
    gap: spaces.lg,
    borderRadius: spaces.md,
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
  titleContainer: {
    marginVertical: 'auto',
    paddingRight: spaces.xl,
  },
  button: {
    paddingHorizontal: spaces.md,
    width: '100%',
  },
});

export default CardInfo;
