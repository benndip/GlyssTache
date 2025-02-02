import {Pressable, StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {theme} from '../../constants/colors';
import {custom} from '../../custom';
import {H2} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import {utils} from '../../utils';
import {svg} from '../../assets/svg';
import {shadowStyle} from '../../constants/shadow';
import Icons from '../../assets/svg/Icons';
import LocationItem from '../../components/location/LocationItem';
import {
  getCurrentPosition,
  requestLocationPermission,
} from '../../utils/geolocation';
import {AppDispatch} from '../../store';
import {Domain, SkiPass} from '../../types';
import {components} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../types/navigation';
import {setLocation} from '../../store/slices/authSlice';
import {findNearestDomain} from '../../utils/findNearestDomain';
import {setCurrentDomain} from '../../store/slices/tabSlice';
import LocationDropdown from '../../components/location/LocationDropdown';
import useSelectLocation from '../../hooks/location/useSelectLocation';
import Button from '../../components/Button';

export default function Location({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Location'>) {
  const {
    domain,
    subscription,
    skiPassName,
    locationsDisplayed,
    subscriptionDisplayed,
    formInvalid,
    setDisplayedDomains,
    setDisplayedSkiPasses,
    setDomain,
    setSubscription,
    setSkiPassName,
    setLocationsDisplayed,
    setSubscriptionDisplayed,
    displayedDomains,
    displayedSkiPasses,
    inputRef,
    domainName,
    setDomainName,
    domainList,
    loadingDomainList,
    refetchDomainList,
    refetchingDomainList,
    loadingSkiPassesList,
    refetchSkiPassesList,
    refetchingSkiPassesList,
    skiPassesList,
  } = useSelectLocation();
  const dispatch = useDispatch<AppDispatch>();

  async function onLocationPress() {
    const granted = await requestLocationPermission();
    if (granted) {
      getCurrentPosition(location => {
        const nearest = findNearestDomain(
          location.coords.latitude,
          location.coords.longitude,
          domainList ?? [],
        );
        if (nearest) {
          dispatch(setCurrentDomain(nearest));
          setDomain(nearest);
        }
      });
      setLocationsDisplayed(prev => !prev);
    }
  }

  function onLocationItemPress(item: Domain | null) {
    setDomain(item ?? undefined);
    dispatch(setCurrentDomain(item));
    setLocationsDisplayed(false);
    setDomainName(item?.name ?? '');
    inputRef.current?.blur();
  }

  function onSubscriptionItemPress(item: SkiPass | null) {
    setSubscriptionDisplayed(false);
    setSubscription(item ?? undefined);
    setSkiPassName(item?.name ?? '');
  }

  function onNextPress() {
    if (subscription && domain) {
      dispatch(setCurrentDomain(domain));
      dispatch(setLocation({location: domain.name, skiPass: subscription}));
      if (route?.params?.isModal) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
  }

  return (
    <custom.SafeAreaView
      style={styles.safeArea}
      statusBarStyle="dark-content"
      statusBarColor={theme.colors.background}
      insets={['top', 'bottom']}>
      {route.params?.isModal && (
        <View style={styles.handleContainer}>
          <View style={styles.handleIndicator} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>
          <H2>
            Glyss vous accompagne dans plus de {domainList?.length ?? 1294}{' '}
            stations dans le monde !
          </H2>
          <LocationDropdown<Domain>
            data={displayedDomains ?? []}
            errorMessage="Impossible d'afficher la liste des domaines"
            notFoundMessage="Aucun domaine trouvé"
            innerRef={inputRef}
            leftIcon={<svg.LocationSvg />}
            topItem={
              <LocationItem
                onPress={onLocationPress}
                title="Ma position"
                iconName="navigation_compass"
              />
            }
            value={domainName}
            onItemPress={onLocationItemPress}
            resetInput={() => setDomain(undefined)}
            listDisplayed={locationsDisplayed}
            inputProps={{
              onFocus: () => {
                !domainList?.length && refetchDomainList();
                setLocationsDisplayed(true);
              },
              onBlur: () => {
                setLocationsDisplayed(false);
              },
              onChangeText: text => {
                setDomainName(text);
                setDisplayedDomains(
                  domainList?.filter(domain =>
                    domain.name.toLowerCase().includes(text.toLowerCase()),
                  ) ?? [],
                );
                !locationsDisplayed && setLocationsDisplayed(true);
              },
            }}
            loading={loadingDomainList || refetchingDomainList}
            placeholder={'Saisissez votre station de ski'}
          />
        </View>
        <View style={{marginTop: spaces.xxl}}>
          <H2>Sélectionnez votre forfait de ski</H2>
          <LocationDropdown<SkiPass>
            loading={loadingSkiPassesList || refetchingSkiPassesList}
            data={displayedSkiPasses ?? []}
            placeholder="Sélectionner un forfait"
            notFoundMessage="Aucun forfait trouvé"
            value={skiPassName}
            listDisplayed={subscriptionDisplayed}
            inputProps={{
              onFocus: () => {
                !skiPassesList?.length && refetchSkiPassesList();
                setSubscriptionDisplayed(true);
              },
              onBlur: () => {
                setSubscriptionDisplayed(false);
              },
              onChangeText: text => {
                setSkiPassName(text);
                setDisplayedSkiPasses(
                  skiPassesList?.filter(skiPass =>
                    skiPass.name.toLowerCase().includes(text.toLowerCase()),
                  ) ?? [],
                );
              },
            }}
            onItemPress={onSubscriptionItemPress}
            resetInput={() => setSubscription(undefined)}
            leftIcon={
              <View>
                <Icons iconName="user_user_card_id" />
              </View>
            }
            rightIcon={
              <Pressable
                onPress={() => setSubscriptionDisplayed(prev => !prev)}
                style={{
                  padding: 5,
                  transform: [
                    {rotate: subscriptionDisplayed ? '180deg' : '0deg'},
                  ],
                }}>
                <svg.ChevronDownSvg />
              </Pressable>
            }
            errorMessage="Impossible d'afficher la liste des forfaits"
          />
        </View>
      </ScrollView>
      {route?.params?.isModal ? (
        <View style={styles.validateButtonContainer}>
          <Button
            onPress={onNextPress}
            disabled={formInvalid}
            title="Valider"
            containerStyle={{marginTop: spaces.md}}
            iconForward
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <components.Button
            disabled={formInvalid}
            iconForward={true}
            touchableOpacityStyle={styles.nextButton}
            title={'Suivant'}
            loading={false}
            onPress={onNextPress}
          />
        </View>
      )}
    </custom.SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  handleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  handleIndicator: {
    width: 50,
    height: 5,
    backgroundColor: theme.colors.gray,
    top: 10,
    borderRadius: 20,
  },
  validateButtonContainer: {
    marginBottom: spaces.xxl,
    width: '100%',
    paddingHorizontal: spaces.md,
  },
  contentContainer: {
    paddingHorizontal: spaces.md,
    paddingVertical: utils.responsiveHeight(40),
  },
  inputField: {
    borderColor: theme.colors.transparent,
    borderRadius: 0,
  },
  dropdownContainer: {
    ...shadowStyle.shadowContainer,
    gap: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: spaces.lg,
  },
  list: {
    gap: 1,
  },
  subscriptionContainer: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: spaces.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spaces.md,
    flexDirection: 'row',
    backgroundColor: theme.colors.grayLite,
    borderWidth: 1,
    borderColor: theme.colors.transparent,
  },
  subscriptionRow: {
    gap: spaces.sm,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingVertical: utils.responsiveHeight(40),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: spaces.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    paddingHorizontal: spaces.md,
    width: 140,
  },
});
