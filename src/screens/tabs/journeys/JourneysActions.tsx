import JourneySuggestion from '../../../components/JourneySuggestion';
import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {theme} from '../../../constants';
import {components} from '../../../components';
import useJourneysLike from '../../../hooks/forYou/useJourneysLike';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {custom} from '../../../custom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JourneyStackParamList} from '../../../types/navigation';
import ButtonBack from '../../../components/ButtonBack';
import {Journey} from '../../../types/ForYou';
import Header from '../../../components/Header';
import {spaces} from '../../../constants/spaces';
import {H1} from '../../../components/Typography';
import useJourneysHistory from '../../../hooks/home/useJourneysHistory';
import {debug} from '../../../utils/debug';
import useLikedJourneys from '../../../hooks/like/useLikedJourneys';

const EmptyJourneyList = ({
  mode,
  navigation,
}: {
  mode: string;
  navigation: any;
}) => {
  return (
    <View style={styles.emptyContainer}>
      <components.CardInfoActions
        text={
          mode === 'past'
            ? "Vous n'avez pour le moment réalisé aucun trajet"
            : "Vous n'avez pas encore de trajet planifié. C'est le moment d'ajouter votre premier !"
        }
        buttonLabel={
          mode === 'past' ? 'Réaliser mon premier trajet' : 'Ajouter un trajet'
        }
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const RenderContent = ({
  route,
  navigation,
}: NativeStackScreenProps<
  JourneyStackParamList,
  'JourneysActions'
>): JSX.Element => {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const {mode} = route.params;
  const _cat = {
    TOUS: 'TOUS',
    BEGINNER: 'DÉBUTANT',
    INTERMEDIATE: 'INTERMÉDIAIRE',
    EXPERIENCED: 'EXPÉRIMENTÉ',
    PRO: 'PROFESSIONNEL',
  };

  const historyResult = useJourneysHistory();
  const likeResult = useLikedJourneys(currentDomain?.id);
  const list =
    mode === 'past' ? historyResult.journeysHistory : likeResult.likedJourneys;
  const loadingList =
    mode === 'past'
      ? historyResult.loadingJourneysHistory
      : likeResult.loadingLikedJourneys;
  const displayedItems = list;
  const difficultyMap: {[key: string]: number} = {
    easy: 1,
    intermediate: 2,
    novice: 3,
  };
  const renderJourney = ({item}: {item: Journey}) => {
    return (
      <JourneySuggestion
        disabled={loadingList}
        onPress={() => {
          navigation.navigate('JourneyDetails', {
            kind: mode === 'past' ? 'history' : 'like',
            mode: 'list',
            duration: item.duration,
            id_ski_pass: item.domain_id,
            id: item.id,
          });
        }}
        difficulty={item.difficulty}
        distance={item.distance}
        name={item.name}
        duration={item.duration}
        slope_list={item.slope_list}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ButtonBack
        containerStyle={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <H1 style={{marginBottom: spaces.lg}}>
            {mode === 'past' ? 'Mes trajets passés' : 'Mes trajets à venir'}{' '}
            {list?.length > 0 ? `(${list?.length})` : ''}
          </H1>

          <FlatList
            scrollEnabled={false}
            renderItem={renderJourney}
            data={displayedItems ?? []}
            contentContainerStyle={{gap: spaces.md}}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={loadingList} />}
            ListEmptyComponent={
              <EmptyJourneyList mode={mode ?? ''} navigation={navigation} />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const JourneysActions = ({
  route,
  navigation,
}: NativeStackScreenProps<JourneyStackParamList, 'JourneysActions'>) => {
  return (
    <custom.SafeAreaView
      style={styles.safeArea}
      statusBarStyle="light-content"
      statusBarColor={theme.colors.primary}
      insets={['top']}>
      <Header />
      <RenderContent route={route} navigation={navigation} />
    </custom.SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    minHeight: '100%',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  scrollViewContent: {
    paddingHorizontal: spaces.md,
  },
  contentContainer: {
    backgroundColor: theme.colors.background,
    paddingTop: 16,
    paddingBottom: 40,
    marginBottom: 150,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  safeArea: {
    backgroundColor: theme.colors.primary,
  },
});

export default JourneysActions;
