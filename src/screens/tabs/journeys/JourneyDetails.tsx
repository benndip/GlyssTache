import {custom} from '../../../custom';
import CardJourney from '../../../components/CardJourney';
import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  RefreshControl,
  Pressable,
  StyleSheet,
} from 'react-native';
import {theme} from '../../../constants';
import {components} from '../../../components';
import {Customer} from '../../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  JourneyStackParamList,
  JourneyStackParams,
} from '../../../types/navigation';
import Header from '../../../components/Header';
import useJourneysGenerate from '../../../hooks/forYou/useJourneysGenerate';
import ButtonBack from '../../../components/ButtonBack';
import CardSteps from '../../../components/CardSteps';
import Button from '../../../components/Button';
import HeaderLocation from '../../../components/HeaderLocation';
import {spaces} from '../../../constants/spaces';
import useLikeJourney from '../../../hooks/like/useLikeJourney';
import useDislikeJourney from '../../../hooks/like/useDislikeJourney';
import useLikedJourneys from '../../../hooks/like/useLikedJourneys';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {BodyL, CTAM} from '../../../components/Typography';
import {Journey} from '../../../types/ForYou';
import useJourneysDetails from '../../../hooks/journeys/useJourneysDetails';
import {getCurrentPosition} from '../../../utils/geolocation';
import Toast from 'react-native-toast-message';

const RenderContent = ({
  id,
  duration,
  level,
  kind,
  navigation,
}: {
  id: number | string;
  mode: string;
  id_ski_pass: number;
  duration: number;
  journey: Journey;
  level: string;
  navigation: NativeStackNavigationProp<JourneyStackParamList>;
  kind: JourneyStackParams['kind'];
}): JSX.Element => {
  const journeyGenerate = useJourneysGenerate();

  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );

  const {likeJourney, isLiking} = useLikeJourney(() => {
    Toast.show({
      type: 'success',
      text1: 'Trajet ajouté',
    });
  });
  const {dislikeJourney} = useDislikeJourney(() => {
    Toast.show({
      type: 'success',
      text1: 'Trajet supprimé',
    });
  });
  const {likedJourneys} = useLikedJourneys(currentDomain?.id);
  const {journeyDetails, loadingJourneyDetails} = useJourneysDetails({
    id,
    kind,
  });

  const loadingStepList =
    journeyGenerate.generateLoading || loadingJourneyDetails;
  const StepList = journeyGenerate.generatedJourney || journeyDetails;
  const isLiked = !!likedJourneys.find(
    journey => journey.name === StepList?.name,
  );

  const user = useSelector((state: RootState) => state.authSlice.user);
  useEffect(() => {
    if (kind === 'generated') {
      getCurrentPosition(position => {
        journeyGenerate.generateJourney({
          domainId: currentDomain?.id,
          duration: duration,
          id_ski_pass: user?.skiPass?.id,
          level: level,
          lat_lon: __DEV__
            ? [49.43215, 1.15768]
            : [position.coords.latitude, position.coords.longitude],
        });
      });
    }
  }, []);

  if (journeyGenerate.generateError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          gap: spaces.md,
          paddingHorizontal: spaces.md,
        }}>
        <BodyL>Impossible de générer le trajet</BodyL>
        <Button
          title={'Revenir à la page précédente'}
          onPress={() => {
            navigation.replace('Journeys');
          }}
          containerStyle={{
            width: '100%',
          }}
          iconBack
        />
      </View>
    );
  }
  if (StepList) {
    const difficultyMap: {[key: string]: number} = {
      easy: 1,
      intermediate: 2,
      novice: 3,
    };
    const skiSlopes = StepList.slope_list?.map(
      item => difficultyMap[item.difficulty],
    );
    const displayedItems = StepList.direction_list;
    const renderCustomer = ({item}: {item: Customer}) => {
      return (
        <Pressable
          disabled={false}
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          onPress={() => {
            //navigation.replace('TabNavigator');
          }}>
          <CardSteps item={item} />
        </Pressable>
      );
    };

    return (
      <View style={{flex: 1}}>
        <ButtonBack
          containerStyle={{paddingHorizontal: 12, paddingVertical: 16}}
          color={theme.colors.onPrimary}
          onPress={() => {
            navigation.replace('Journeys');
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <HeaderLocation data={{isloc: false}} containerStyle={{}}>
              <View style={{marginTop: 40, gap: 16}}>
                <Text
                  style={{
                    ...components.Typography.Titleh1,
                    color: theme.colors.onPrimary,
                  }}>
                  {StepList.name}
                </Text>
                <View style={{paddingTop: 10, marginBottom: spaces.xxl}}>
                  <CardJourney
                    difficulty={StepList.difficulty}
                    distance={parseFloat((StepList.distance / 1000).toFixed(2))}
                    domainName={StepList.name}
                    duration={StepList.duration}
                    skiSlopes={skiSlopes}
                  />
                </View>
              </View>
            </HeaderLocation>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.background,
              paddingTop: 40,
              paddingBottom: 40,
              flex: 1,
              minHeight: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                gap: 12,
              }}>
              <Text style={{...components.Typography.Titleh4}}>
                Les étapes du trajet ({displayedItems?.length})
              </Text>
            </View>
            <View style={{position: 'relative'}}>
              {displayedItems?.length > 0 && (
                <View
                  style={{
                    left: 42,
                    top: 20,
                    width: 2,
                    position: 'absolute',
                    backgroundColor: theme.colors.grayDark + '70',
                    height: '90%',
                  }}
                />
              )}
              <FlatList
                scrollEnabled={false}
                renderItem={renderCustomer}
                data={displayedItems ?? []}
                keyExtractor={(_, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={loadingStepList} />}
                ListEmptyComponent={
                  <components.CardInfoActions
                    isbutton={false}
                    containerStyle={{
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
            <View style={{paddingBottom: 50}}>
              <Button
                iconForward
                title={'Démarrer le trajet'}
                containerStyle={{
                  marginTop: 10,
                  paddingTop: 16,
                  paddingHorizontal: 16,
                }}
                textStyle={{color: theme.colors.onPrimary}}
                onPress={() => {
                  navigation.navigate('JourneyMap', {kind: kind, id});
                }}
              />
              {isLiked ? (
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    dislikeJourney({
                      idDomain: currentDomain!.id,
                      idLike: likedJourneys.find(
                        journey => journey.name === StepList?.name,
                      )!.id as string,
                    });
                  }}>
                  <CTAM style={styles.deleteButtonText}>
                    Supprimer des trajets à venir
                  </CTAM>
                </Pressable>
              ) : (
                <Button
                  iconForward
                  variant="secondary"
                  title={'Ajouter à mes trajets à venir'}
                  containerStyle={{paddingTop: 16, paddingHorizontal: 16}}
                  textStyle={{color: theme.colors.primary}}
                  disabled={isLiking}
                  loading={isLiking}
                  onPress={() => {
                    likeJourney({
                      idDomain: currentDomain!.id,
                      idForYou: id as number,
                    });
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <></>;
  }
};
const JourneyDetails = ({
  navigation,
  route,
}: NativeStackScreenProps<JourneyStackParamList, 'JourneyDetails'>) => {
  const {kind} = route.params;
  return (
    <custom.SafeAreaView
      style={{
        backgroundColor: theme.colors.primary,
      }}
      statusBarStyle="light-content"
      statusBarColor={theme.colors.primary}
      insets={['top']}>
      <Header />
      <RenderContent
        id={route.params.id}
        mode={route.params.mode}
        duration={route.params.duration}
        id_ski_pass={route.params.id_ski_pass}
        level={route.params.level}
        kind={kind}
        navigation={navigation}
      />
    </custom.SafeAreaView>
  );
};

export default JourneyDetails;

const styles = StyleSheet.create({
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 32,
    marginTop: spaces.md,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    textDecorationLine: 'underline',
    color: theme.colors.primary,
  },
});
