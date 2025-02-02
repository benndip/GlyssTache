import React from 'react';
import {View, ViewStyle, Pressable, StyleSheet} from 'react-native';
import {theme} from '../constants';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {BodyL, BodyM} from './Typography';
import {spaces} from '../constants/spaces';
import {useNavigation} from '@react-navigation/native';
// Define the type for props
interface Props {
  containerStyle?: ViewStyle; // Optional style for the container
  data?: object;
  children: React.ReactNode; // For rendering children between the tags
}
const HeaderLocation: React.FC<Props> = ({containerStyle, children}) => {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const currentSubscription = useSelector(
    (state: RootState) => state.authSlice.user?.skiPass?.name,
  );
  const navigation = useNavigation();

  return (
    <View style={[containerStyle]}>
      <View style={styles.innerContainer}>
        <View style={styles.fullWidth}>
          <custom.ImageBackground
            resizeMode="stretch"
            source={require('../assets/images/BG-top-illustration.png')}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}>
            <Pressable
              style={styles.locationContainer}
              onPress={() =>
                navigation.navigate('LocationModal', {
                  isModal: true,
                })
              }>
              <View style={styles.centerVertical}>
                <svg.SkiLocationSvg />
              </View>
              <View style={styles.flex1}>
                <View style={styles.locationRow}>
                  <View style={styles.locationIconContainer}>
                    <svg.LocationSvg />
                  </View>
                  <BodyL
                    style={{
                      color: !!currentDomain?.name
                        ? theme.colors.primary
                        : undefined,
                    }}>
                    {currentDomain?.name ?? 'Choisir un domaine'}
                  </BodyL>
                </View>
                <View style={styles.subscriptionRow}>
                  <svg.Icons iconName="interface_check" stroke="#006605" />
                  <BodyM style={styles.subscriptionText}>
                    {currentSubscription}
                  </BodyM>
                </View>
              </View>
              <View style={styles.chevronContainer}>
                <svg.ChevronDownSvg />
              </View>
            </Pressable>
            {children}
          </custom.ImageBackground>
        </View>
      </View>
    </View>
  );
};
export default HeaderLocation;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  backgroundImage: {
    height: '100%',
    paddingHorizontal: spaces.md,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
    backgroundColor: theme.colors.gray,
  },
  locationContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spaces.md,
    padding: spaces.sm,
    borderRadius: spaces.md,
    marginTop: spaces.md2,
  },
  centerVertical: {
    marginVertical: 'auto',
  },
  flex1: {
    flex: 1,
  },
  locationRow: {
    gap: 10,
    flexDirection: 'row',
  },
  locationIconContainer: {
    marginVertical: 'auto',
    width: 25,
  },
  subscriptionRow: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionText: {
    color: theme.colors.grayDark,
  },
  chevronContainer: {
    marginLeft: spaces.xs,
    marginVertical: 'auto',
    paddingHorizontal: spaces.sm2,
  },
});
