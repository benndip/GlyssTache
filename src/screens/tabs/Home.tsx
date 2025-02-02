import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {theme} from '../../constants';
import {svg} from '../../assets/svg';
import {components} from '../../components';
import {BodyM, H1, H2} from '../../components/Typography';
import {spaces} from '../../constants/spaces';
import {RootState} from '../../store';
import {HomeStackParamList, RootStackParamList} from '../../types/navigation';
import Row from '../../custom/Row';
import HomeJourneySuggestion from '../../components/home/HomeJourneySuggestion';
import SuggestedJourneys from '../../components/home/SuggestedJourneys';
import HomeForYou from '../../components/home/HomeForYou';
import useLikedJourneys from '../../hooks/like/useLikedJourneys';
import useProfile from '../../hooks/profile/useProfile';

const Social = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'TabNavigator'> &
    BottomTabScreenProps<RootStackParamList['TabNavigator'], 'Social'> &
    BottomTabScreenProps<RootStackParamList['TabNavigator'], 'Trajets'>,
  NativeStackScreenProps<HomeStackParamList>
>) => {
  const {user} = useSelector((state: RootState) => state.authSlice);

  const currentDomainId = useSelector(
    (state: RootState) => state.tabSlice.currentDomain?.id,
  );
  const {likedJourneys, loadingLikedJourneys} =
    useLikedJourneys(currentDomainId);
  useEffect(() => {
    if (!user?.skiPass) {
      navigation.navigate('Location');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backgroundContainer}>
          <components.HeaderLocation>
            <View style={styles.headerContent}>
              <H1 style={styles.greeting}>Bonjour {user?.name ?? 'toi'} !</H1>
              <View style={styles.upcomingJourneysHeader}>
                <svg.JourneySvg />
                <H2 style={styles.upcomingJourneysTitle}>Trajets à venir</H2>
              </View>
            </View>
            <FlatList
              data={likedJourneys}
              renderItem={({item}) => (
                <HomeJourneySuggestion
                  item={item}
                  onPress={() => {
                    navigation.navigate('Trajets', {
                      screen: 'JourneyMap',
                      params: {
                        kind: 'like',
                        id: item.id,
                      },
                    });
                  }}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              style={styles.journeysHistoryList}
              contentContainerStyle={styles.journeysHistoryContent}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                loadingLikedJourneys ? (
                  <BodyM style={styles.loadingText}>
                    Chargement de vos trajets ...
                  </BodyM>
                ) : (
                  <Row style={styles.emptyStateRow}>
                    <View>
                      <svg.InfoSvg />
                    </View>
                    <BodyM style={styles.emptyStateText}>
                      Vous n'avez pas de trajet planifié
                    </BodyM>
                  </Row>
                )
              }
            />
          </components.HeaderLocation>
          {likedJourneys.length === 0 && (
            <View style={styles.planJourneyButtonContainer}>
              <components.Button
                iconForward={true}
                touchableOpacityStyle={{
                  paddingHorizontal: spaces.md,
                  width: '100%',
                }}
                title={'Planifier un trajet'}
                onPress={() => {
                  navigation.navigate('Trajets', {
                    screen: 'Journeys',
                  });
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.cardInfoContainer}>
          <components.CardInfo
            containerStyle={styles.cardInfoContent}
            onPress={() => navigation.navigate('NewFeature')}
          />
        </View>
        <SuggestedJourneys
          onSeeAllPress={() =>
            navigation.navigate('Partner', {
              screen: 'Partners',
            })
          }
          onPress={journey => {
            navigation.navigate('Trajets', {
              screen: 'JourneyDetails',
              params: {
                kind: 'foryou',
                mode: 'list',
                duration: journey.duration,
                id_ski_pass: journey.domain_id,
                id: journey.id,
              },
            });
          }}
        />
        <HomeForYou
          onCardPress={customerId => {
            navigation.navigate('Partner', {
              screen: 'PartnerDetails',
              params: {customerId},
            });
          }}
          onSeeAllPress={() => {
            navigation.navigate('Partner', {
              screen: 'Partners',
            });
          }}
        />
        {/* <HomeFriendsJourneys /> */}
      </ScrollView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  journeysHistoryList: {
    marginVertical: spaces.xl,
    marginBottom: spaces.xxl,
    alignSelf: 'center',
  },
  planJourneyButtonContainer: {
    marginTop: -spaces.xl,
    paddingHorizontal: spaces.md,
    paddingBottom: 20,
  },
  backgroundContainer: {
    backgroundColor: theme.colors.background,
  },
  headerContent: {
    marginTop: spaces.xxl,
  },
  greeting: {
    color: theme.colors.onPrimary,
  },
  upcomingJourneysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spaces.xl,
    gap: spaces.sm2,
  },
  upcomingJourneysTitle: {
    color: theme.colors.onPrimary,
  },
  journeysHistoryContent: {
    gap: spaces.sm,
  },
  loadingText: {
    color: theme.colors.onPrimary,
    fontStyle: 'italic',
  },
  emptyStateRow: {
    gap: spaces.xs,
  },
  emptyStateText: {
    color: theme.colors.onPrimary,
  },
  cardInfoContainer: {
    backgroundColor: theme.colors.background,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardInfoContent: {
    paddingHorizontal: spaces.md,
    paddingBottom: 20,
  },
});
export default Social;
