import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, FlatList, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {AppDispatch} from '../store';
import type {ViewableItemsChanged} from '../types';
import {svg} from '../assets/svg';
import {BodyL, H2} from '../components/Typography';
import SignUpButton from '../components/onboarding/SignUpButton';
import SignInButton from '../components/onboarding/SignInButton';
import {spaces} from '../constants/spaces';

type DataType = {
  id: number;
  svg: any;
  title: string;
  description: string;
};

const data: DataType[] = [
  {
    id: 1,
    svg: svg.OnboardingSvg1,
    title: 'Crée ta journée de ski idéale',
    description: "Indique ton niveau et tes envies, et Glyss s'occupe de tout.",
  },
  {
    id: 2,
    svg: svg.OnboardingSvg2,
    title: 'Profite de ton after ski sur mesure',
    description:
      'Restaurants, activités familiales, soirées… Découvre nos commerces partenaires.',
  },
  {
    id: 3,
    svg: svg.OnboardingSvg3,
    title: 'Partage des trajets avec tes amis',
    description:
      'Rejoins notre communauté de skieurs et partage tes aventures sur notre onglet social.',
  },
  {
    id: 4,
    svg: svg.OnboardingSvg4,
    title: 'Avec ou sans instructions sonores',
    description:
      'Lève les yeux de ton téléphone et laisse-toi guider par nos instructions sonores en attendant les bracelets.',
  },
];

const Onboarding: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = hooks.useAppNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  const onViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
    const index = info.viewableItems[0]?.index ?? 0;
    setActiveIndex(index);
  }).current;
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: {item: DataType}): JSX.Element => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.progressContainer}>
          {data.map((_, current) => {
            return (
              <View
                key={current}
                style={[
                  styles.progressBar,
                  {
                    backgroundColor:
                      current === activeIndex
                        ? theme.colors.primary
                        : theme.colors.onPrimary,
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.box}>
            <item.svg />
          </View>
          <H2 style={styles.title} numberOfLines={2}>
            {item.title}
          </H2>
          <BodyL style={styles.description}>{item.description}</BodyL>
        </View>
      </View>
    );
  };

  return (
    <custom.SafeAreaView
      style={styles.safeArea}
      statusBarStyle="dark-content"
      statusBarColor={theme.colors.background}
      insets={['top', 'bottom']}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.scrollViewContent}>
        <LinearGradient
          colors={['#E5EBF5', '#CCD8EB']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.gradient}>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data}
              bounces={false}
              ref={flatListRef}
              horizontal={true}
              pagingEnabled={true}
              viewabilityConfig={viewabilityConfig}
              contentContainerStyle={{flexGrow: 1}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => renderItem({item})}
              keyExtractor={item => item.id.toString()}
              onViewableItemsChanged={onViewableItemsChanged}
            />
          </View>
          <View style={styles.buttonContainer}>
            <SignUpButton
              onPress={() => navigation.navigate('SignUpEmail', {})}
            />
            <SignInButton
              onPress={() => navigation.navigate('SignInEmail', {})}
            />
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </custom.SafeAreaView>
  );
};
export default Onboarding;
const styles = StyleSheet.create({
  box: {
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  safeArea: {
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '100%',
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  flatListContainer: {
    width: '100%',
    flex: 1,
    paddingVertical: utils.responsiveHeight(20),
  },
  buttonContainer: {
    paddingBottom: spaces.xl,
    gap: spaces.md,
    paddingVertical: utils.responsiveHeight(20),
    width: '100%',
  },
  slideContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    width: theme.sizes.deviceWidth,
    paddingHorizontal: utils.responsiveHeight(20),
  },
  progressContainer: {
    gap: spaces.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    marginTop: utils.responsiveHeight(50),
    marginBottom: utils.responsiveHeight(10),
    paddingHorizontal: utils.responsiveHeight(20),
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
