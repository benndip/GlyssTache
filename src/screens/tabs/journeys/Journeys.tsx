import {svg} from '../../../assets/svg';
import JourneySuggestion from '../../../components/JourneySuggestion';
import React, {useMemo, useState} from 'react';
import {ScrollView, View, Text, FlatList, RefreshControl} from 'react-native';
import {theme} from '../../../constants';
import {components} from '../../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {Journey} from '../../../types/ForYou';
import {JourneyStackParamList} from '../../../types/navigation';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import {spaces} from '../../../constants/spaces';
import Icons from '../../../assets/svg/Icons';
import {BodyL} from '../../../components/Typography';
import useJourneysLike from '../../../hooks/forYou/useJourneysLike';
import CardInfoActions from '../../../components/CardInfoActions';
const RenderContent = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<JourneyStackParamList, 'Journeys'>;
}): JSX.Element => {
  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );
  const _cat = {
    TOUS: 'TOUS',
    BEGINNER: 'DÉBUTANT',
    INTERMEDIATE: 'INTERMÉDIAIRE',
    EXPERIENCED: 'EXPÉRIMENTÉ',
    PRO: 'PROFESSIONNEL',
  };
  const filters = useMemo(
    () => ['TOUS', 'DÉBUTANT', 'INTERMÉDIAIRE', 'EXPÉRIMENTÉ', 'PROFESSIONNEL'],
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const {loadingJourneysList, JourneysList: journeysList} = useJourneysLike({
    domainId: currentDomain?.id,
  });

  const displayedItems = useMemo(() => {
    return journeysList?.filter(
      item =>
        selectedFilter === 'TOUS' || _cat[item.difficulty] === selectedFilter,
    );
  }, [journeysList, selectedFilter]);

  const difficultyMap: {[key: string]: number} = {
    easy: 1,
    intermediate: 2,
    novice: 3,
  };

  const renderJourney = ({item}: {item: Journey}) => {
    const skiSlopes = item.slope_list.map(
      item => difficultyMap[item.difficulty],
    );
    return (
      <JourneySuggestion
        disabled={loadingJourneysList}
        onPress={() => {
          navigation.navigate('JourneyDetails', {
            kind: 'foryou',
            mode: 'list',
            duration: item.duration,
            id_ski_pass: item.domain_id,
            id: item.id,
          });
        }}
        difficulty={item.difficulty}
        distance={item.distance} // unit meters
        name={item.name}
        duration={item.duration} // unit seconds
        slope_list={item.slope_list}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: theme.colors.background}}>
          <components.HeaderLocation containerStyle={{}}>
            <View style={{marginTop: 40, gap: 16}}>
              <Text
                style={{
                  ...components.Typography.Titleh1,
                  color: theme.colors.onPrimary,
                }}>
                Trajets
              </Text>
              <Button
                iconLeft={
                  <View style={{position: 'absolute', left: spaces.md}}>
                    <Icons iconName="route" stroke={'#003A9B'} />
                  </View>
                }
                iconRight={
                  <View style={{position: 'absolute', right: spaces.md}}>
                    <Icons iconName="arrow_chevron_right" stroke={'#003A9B'} />
                  </View>
                }
                variant="secondary"
                touchableOpacityStyle={{
                  borderRadius: 16,
                  height: 56,
                  marginTop: spaces.xxl,
                }}
                title="Mes trajets à venir"
                onPress={() => {
                  navigation.navigate('JourneysActions', {mode: 'future'});
                }}
              />
              <Button
                iconLeft={
                  <View style={{position: 'absolute', left: spaces.md}}>
                    <Icons iconName="navigation_flag" stroke={'#003A9B'} />
                  </View>
                }
                iconRight={
                  <View style={{position: 'absolute', right: spaces.md}}>
                    <Icons iconName="arrow_chevron_right" stroke={'#003A9B'} />
                  </View>
                }
                variant="secondary"
                touchableOpacityStyle={{
                  borderRadius: 16,
                  height: 56,
                }}
                title="Mes trajets passés"
                onPress={() => {
                  navigation.navigate('JourneysActions', {mode: 'past'});
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                  gap: 4,
                  paddingHorizontal: 16,
                }}>
                <BodyL
                  style={{
                    color: theme.colors.onPrimary,
                    marginBottom: spaces.xxl,
                  }}>
                  Renseigne ton niveau et tes envies et on te crée ton trajet
                  idéal
                </BodyL>
              </View>
            </View>
          </components.HeaderLocation>
          <View
            style={{
              marginTop: -32,
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}>
            <components.Button
              iconForward={true}
              touchableOpacityStyle={{paddingHorizontal: 16, width: '100%'}}
              title={'Créer un trajet sur mesure'}
              onPress={() => {
                navigation.navigate('CreateJourney');
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.background,
            paddingBottom: 120,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 20,
              gap: 12,
            }}>
            <svg.JourneySvg />
            <Text
              style={{
                ...components.Typography.Titleh2,
              }}>
              Trajets recommandés
            </Text>
          </View>
          <components.FilterButtons
            filters={filters}
            selectedFilter={selectedFilter}
            selectFilter={setSelectedFilter}
            containerStyle={{
              paddingHorizontal: 16,
              marginBottom: spaces.lg,
            }}
          />
          <FlatList
            scrollEnabled={false}
            renderItem={renderJourney}
            data={displayedItems ?? []}
            style={{alignSelf: 'center', width: '100%',}}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={loadingJourneysList} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              alignItems: 'center',
            }}
            ListEmptyComponent={
              <CardInfoActions
                isbutton={false}
                containerStyle={{
                  width: '100%',
                  paddingHorizontal: 16,
                  paddingTop: 16,
                }}
                title={'Pas de trajets'}
                text={'Créer un trajet sur mesure'}
                textStyle={{
                  textDecorationLine: 'underline',
                  color: theme.colors.primary,
                }}
                onTextPress={() => {
                  navigation.navigate('CreateJourney', {});
                }}
              />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Journeys = ({
  navigation,
}: NativeStackScreenProps<JourneyStackParamList, 'Journeys'>) => {
  return <RenderContent navigation={navigation} />;
};

export default Journeys;
