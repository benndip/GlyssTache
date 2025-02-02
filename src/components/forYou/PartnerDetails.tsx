import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  Platform,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showMessage} from 'react-native-flash-message';

import {theme} from '../../constants';
import {colors} from '../../constants/colors';
import Button from '../Button';
import Icons from '../../assets/svg/Icons';
import usePartnerJourneys from '../../hooks/forYou/useJourneys';
import usePartnerDetails from '../../hooks/forYou/usePartnerDetails';
import GoBackHeader from '../navigation/GoBackHeader';
import {RootState} from '../../store';
import {BodyM, H4, H3, BodyL, H1, LabelTag} from '../Typography';
import JourneySuggestion from '../JourneySuggestion';
import {shadowStyle} from '../../constants/shadow';
import {minutesToHours} from '../../utils/minuteToHours';
import {spaces} from '../../constants/spaces';
import {ForYouStackParamList, RootStackParamList} from '../../types/navigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type PartnerDetailsProps = CompositeScreenProps<
  BottomTabScreenProps<RootStackParamList['TabNavigator'], 'Trajets'>,
  NativeStackScreenProps<ForYouStackParamList, 'PartnerDetails'>
>;

export default function PartnerDetails({
  route,
  navigation,
}: PartnerDetailsProps) {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );

  const {
    loadingPartnerDetails,
    partnerDetails,
    refetchPartnerDetails,
    refetchingPartnerDetails,
  } = usePartnerDetails({
    domainId: currentDomain?.id,
    customerId: route.params.customerId,
  });
  const {journeys} = usePartnerJourneys({
    domainId: currentDomain?.id,
    customerId: route.params.customerId,
  });

  const onPhonePress = () => {
    Linking.openURL(`tel:${partnerDetails?.Phone}`).catch(() =>
      Alert.alert('Erreur', "Impossible d'effectuer l'appel"),
    );
  };

  function openMap() {
    if (partnerDetails?.MapNode !== '-1') {
      Alert.alert(
        'Fonctionnalité bientôt disponible',
        'Node id is ' + partnerDetails?.MapNode,
      );
      return;
    }
    const address = encodeURIComponent(partnerDetails?.Address ?? '');
    const url =
      Platform.select({
        ios: `maps://app?address=${address}`,
        android: `geo:0,0?q=${address}`,
      }) ?? '';

    Linking.openURL(url).catch(() => {
      showMessage({
        message: 'Error',
        description: "Impossible d'ouvrir la carte",
        type: 'danger',
        icon: 'danger',
      });
    });
  }

  if (loadingPartnerDetails) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!partnerDetails) {
    return (
      <View style={styles.centered}>
        <Text>Erreur lors de la récupération des informations</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loadingPartnerDetails || refetchingPartnerDetails}
            onRefresh={refetchPartnerDetails}
            style={{backgroundColor: colors.primary}}
            tintColor={colors.onPrimary}
          />
        }>
        <GoBackHeader />
        <Image
          source={{uri: partnerDetails?.CoverURL ?? ''}}
          style={{width: '100%', height: 200}}
        />
        <LinearGradient
          style={styles.linearGradient}
          colors={[colors.background, colors.border]}>
          <View style={styles.titleRow}>
            <H1 style={{color: colors.primary}}>{partnerDetails.Name}</H1>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <View style={styles.labelContainer}>
              <LabelTag>{partnerDetails.Tag}</LabelTag>
            </View>
          </View>
          {partnerDetails?.IsPremium && (
            <View style={[styles.keyInfos, shadowStyle.shadowContainer]}>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{width: '50%'}}>
                  <View style={[styles.keyInfosItemContainer]}>
                    <BodyM>Horaires</BodyM>
                    <BodyL>
                      {minutesToHours(
                        partnerDetails.OpeningTimeInMinutesFromMidnight,
                      )}{' '}
                      -{' '}
                      {minutesToHours(
                        partnerDetails.ClosingTimeInMinutesFromMidnight,
                      )}
                    </BodyL>
                  </View>
                </View>
                <View style={[styles.keyInfosItemContainer, {width: '50%'}]}>
                  <Text>Téléphone</Text>
                  <Pressable onPress={onPhonePress}>
                    <BodyL
                      style={[
                        {
                          color: colors.primary,
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      {partnerDetails.Phone}
                    </BodyL>
                  </Pressable>
                </View>
              </View>
              <View
                style={[
                  styles.keyInfosItemContainer,
                  {marginBottom: spaces.sm},
                ]}>
                <BodyM>Adresse</BodyM>
                <BodyL>
                  {partnerDetails.MapNode === '-1'
                    ? partnerDetails.Address
                    : 'Présent sur les pistes'}
                </BodyL>
              </View>
              <Button
                title={
                  partnerDetails.MapNode === '-1'
                    ? 'Localiser sur la map'
                    : 'Y aller'
                }
                iconForward
                onPress={openMap}
                containerStyle={shadowStyle.shadowContainer}
                touchableOpacityStyle={{height: 44}}
              />
            </View>
          )}
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: spaces.md,
            width: '100%',
            gap: spaces.xxl,
            marginTop: spaces.xxl,
          }}>
          <View style={{gap: spaces.md}}>
            <H3
              style={{
                lineHeight: 24,
              }}>
              À propos
            </H3>
            <View>
              <BodyM>{partnerDetails.ShortDescription}</BodyM>
              {partnerDetails.IsPremium && (
                <BodyM>{partnerDetails.LongDescription}</BodyM>
              )}
            </View>
          </View>

          {partnerDetails.IsPremium && (
            <View style={styles.advantagesContainer}>
              <H4 style={[styles.h4]}>Points forts</H4>
              {partnerDetails.StrengthPointList?.map((advantage, index) => (
                <View key={index} style={styles.bulletRow}>
                  <View style={styles.bulletBig} />
                  <BodyM>{advantage}</BodyM>
                </View>
              ))}
            </View>
          )}
          {partnerDetails.IsPremium && (
            <View>
              <Text style={[styles.h4]}>Équipements</Text>
              {partnerDetails.EquipmentAndServiceList?.map(
                (equipment, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <View style={styles.bulletSmall} />
                    <BodyM>{equipment}</BodyM>
                  </View>
                ),
              )}
            </View>
          )}
        </View>
        {partnerDetails.IsPremium && journeys?.length > 0 && (
          <LinearGradient
            style={[
              styles.linearGradient,
              {paddingVertical: 30, marginTop: spaces.xxl},
            ]}
            colors={[colors.background, colors.border]}>
            <H4 style={[{fontSize: 18}]}>Trajet{journeys.length > 1 ? 's' : ''} partenaire{journeys.length > 1 ? 's' : ''}</H4>
            <BodyM style={[{marginBottom: spaces.lg, marginTop: spaces.md}]}>
              Envie de découvrir cet établissement ? Laissez vous guider jusqu'à lui et découvrez les plus beaux recoins de votre station.
            </BodyM>

            <FlatList
              data={journeys}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: spaces.sm}}
              renderItem={({item}) => (
                <JourneySuggestion
                  difficulty={item.difficulty}
                  distance={item.distance}
                  name={item?.name}
                  duration={item.duration}
                  slope_list={item.slope_list}
                  onPress={() =>
                    navigation.navigate('Trajets', {
                      screen: 'JourneyDetails',
                      params: {
                        kind: 'foryou',
                        mode: 'list',
                        duration: item.duration,
                        id_ski_pass: item.domain_id,
                        id: item.id,
                      },
                    })
                  }
                />
              )}
            />
          </LinearGradient>
        )}
      </ScrollView>
      <Pressable style={styles.floatingButton} onPress={openMap}>
        <Icons
          iconName="navigation_map"
          stroke={colors.onPrimary}
          SvgProps={{
            height: 24,
            width: 24,
          }}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.colors.grayLite,
    width: '100%',
  },
  goButton: {
    paddingVertical: spaces.xxs,
    width: 100,
    height: 32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  keyInfos: {
    backgroundColor: colors.grayLite,
    borderRadius: 20,
    gap: 16,
    paddingHorizontal: spaces.md,
    paddingVertical: 24,
  },
  keyInfosItemContainer: {
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  h4: {marginBottom: spaces.md},
  linearGradient: {
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.xxl,
  },
  labelContainer: {
    backgroundColor: theme.colors.onPrimary,
    borderRadius: 20,
    paddingHorizontal: spaces.sm2,
    paddingVertical: spaces.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaces.sm,
    marginBottom: spaces.sm,
  },
  bulletSmall: {
    width: 5,
    height: 5,
    marginLeft: spaces.sm2,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  bulletBig: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  advantagesContainer: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: theme.colors.grey,
    paddingHorizontal: 10,
    paddingVertical: spaces.md,
  },
  floatingButton: {
    padding: spaces.lg,
    borderRadius: 1000,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: spaces.lg,
    right: spaces.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadowStyle.shadowContainer,
  },
});
