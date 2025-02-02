import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  BackHandler,
  Platform,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {components} from '.';
import {theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import Button from './Button';
import Icons from '../assets/svg/Icons';
import {showMessage} from 'react-native-flash-message';
import usePartnerJourneys from '../hooks/forYou/useJourneys';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {minutesToHours} from '../utils/minuteToHours';
import JourneySuggestion from './JourneySuggestion';
import {shadowStyle} from '../constants/shadow';

type OpenHours = {
  day: string;
  openAt: string;
  closeAt: string;
};

type Partner = {
  Name: string;
  Tag: string;
  Phone: string;
  IsPremium: boolean;
  MapNode: string;
  OpenHours: OpenHours[];
  Address: string;
  DomainId: number;
  Id: number;
  Lat: number;
  Lon: number;
  ShortDescription: string;
  ClosingTimeInMinutesFromMidnight: number;
  OpeningTimeInMinutesFromMidnight: number;
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
  UpdatedAt: string;
  CoverURL: string;
  LongDescription: string;
  StrengthPointList: string[];
  EquipmentAndServiceList: string[];
};

type PartnerAboutSectionProps = {
  onBackPressed: () => void;
  customerId?: number;
  partner: Partner;
};

export default function PartnerAboutSection({
  onBackPressed,
  customerId,
  partner,
}: PartnerAboutSectionProps) {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );

  const {journeys} = usePartnerJourneys({
    domainId: currentDomain?.id,
    customerId: customerId,
  });

  const onPhonePress = () => {
    Linking.openURL(`tel:${partner.Phone}`).catch(() =>
      Alert.alert('Erreur', "Impossible d'effectuer l'appel"),
    );
  };
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  function openMap() {
    if (partner.MapNode !== '-1') {
      Alert.alert(
        'Fonctionnalité bientôt disponible',
        'Node id is ' + partner.MapNode,
      );
      return;
    }
    const address = encodeURIComponent(partner.Address);
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

  return (
    <>
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 16,
              height: 56,
              backgroundColor: colors.primary,
            },
          ]}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Pressable
              style={[styles.row, {gap: 10, width: 'auto', padding: 4}]}
              onPress={onBackPressed}>
              <Icons iconName="arrow_chevron_left" stroke={colors.grayLite} />
              <Text
                style={[components.Typography.CTA_S, {color: colors.grayLite}]}>
                Retour
              </Text>
            </Pressable>
          </View>
        </View>
        <Image
          source={{uri: partner.CoverURL}}
          style={{width: '100%', height: 200}}
        />
        <LinearGradient
          style={styles.linearGradient}
          colors={[colors.background, colors.border]}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{partner.Name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>{partner.Tag}</Text>
            </View>
          </View>
          {partner.IsPremium && (
            <View style={[styles.keyInfos, shadowStyle.shadowContainer]}>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <Pressable style={{gap: 10, width: '50%'}}>
                  <View style={[styles.keyInfosItemContainer]}>
                    <Text style={styles.content}>Horaires</Text>
                    <Text style={components.Typography.BodyL}>
                      {minutesToHours(partner.OpeningTimeInMinutesFromMidnight)}{' '}
                      -{' '}
                      {minutesToHours(partner.ClosingTimeInMinutesFromMidnight)}
                    </Text>
                  </View>
                </Pressable>
                <View style={[styles.keyInfosItemContainer, {width: '50%'}]}>
                  <Text>Téléphone</Text>
                  <Pressable onPress={onPhonePress}>
                    <Text
                      style={[
                        components.Typography.BodyL,
                        {
                          color: colors.primary,
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      {partner.Phone}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.keyInfosItemContainer, {marginBottom: 8}]}>
                <Text style={styles.content}>Adresse</Text>
                <Text style={components.Typography.BodyL}>
                  {partner.MapNode === '-1'
                    ? partner.Address
                    : 'Présent sur les pistes'}
                </Text>
              </View>
              <Button
                title={
                  partner.MapNode === '-1' ? 'Localiser sur la map' : 'Y aller'
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
            paddingHorizontal: 16,
            width: '100%',
            gap: 40,
            marginTop: 40,
          }}>
          <View style={{gap: 16}}>
            <Text
              style={{
                ...components.Typography.Titleh3,
                lineHeight: 24,
              }}>
              À propos
            </Text>
            <View>
              <Text
                style={{
                  ...components.Typography.BodyM,
                }}>
                {partner.ShortDescription}
              </Text>
              {partner.IsPremium && (
                <Text
                  style={{
                    ...components.Typography.BodyM,
                  }}>
                  {partner.LongDescription}
                </Text>
              )}
            </View>
          </View>

          {partner.IsPremium && (
            <View style={styles.advantagesContainer}>
              <Text style={[styles.h4]}>Points forts</Text>
              {partner.StrengthPointList?.map((advantage, index) => (
                <View key={index} style={styles.bulletRow}>
                  <View style={styles.bulletBig} />
                  <Text style={styles.content}>{advantage}</Text>
                </View>
              ))}
            </View>
          )}
          {partner.IsPremium && (
            <View>
              <Text style={[styles.h4]}>Équipements</Text>
              {partner.EquipmentAndServiceList?.map((equipment, index) => (
                <View key={index} style={styles.bulletRow}>
                  <View style={styles.bulletSmall} />
                  <Text style={styles.content}>{equipment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {partner.IsPremium && (
          <LinearGradient
            style={[
              styles.linearGradient,
              {paddingVertical: 30, marginTop: 40},
            ]}
            colors={[colors.background, colors.border]}>
            <Text style={[components.Typography.Titleh4, {fontSize: 18}]}>
              Trajet partenaire
            </Text>
            <Text
              style={[
                components.Typography.BodyM,
                {marginBottom: 24, marginTop: 16},
              ]}>
              Lorem ipsum dolor sit amet consectetur. Ipsum id ultrices massa
              morbi dui tellus risus suspendisse nec.
            </Text>

            <FlatList
              data={journeys}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <JourneySuggestion
                  difficulty={item.difficulty}
                  distance={item.distance}
                  name={item?.name}
                  duration={item.duration}
                  slope_list={item.slope_list}
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
  container: {
    backgroundColor: theme.colors.grayLite,
    width: '100%',
  },
  goButton: {
    paddingVertical: 2,
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
    paddingHorizontal: 16,
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
  title: {
    ...components.Typography.Titleh1,
    color: theme.colors.primary,
  },
  h4: {
    ...components.Typography.Titleh4,
    marginBottom: 16,
  },
  linearGradient: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  labelContainer: {
    backgroundColor: theme.colors.onPrimary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    ...components.Typography.LabelTAG,
  },
  content: {
    ...components.Typography.BodyM,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bulletSmall: {
    width: 5,
    height: 5,
    marginLeft: 10,
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
    paddingVertical: 16,
  },
  floatingButton: {
    padding: 24,
    borderRadius: 1000,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadowStyle.shadowContainer,
  },
});
