import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {custom} from '../../../custom';
import {theme} from '../../../constants';
import {svg} from '../../../assets/svg';
import {components} from '../../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import SelectLevelModal from '../../../components/SelectLevelModal';
import {Level, LevelListItem, levelLabel} from '../../../types';
import ButtonBack from '../../../components/ButtonBack';
import Header from '../../../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {JourneyStackParamList} from '../../../types/navigation';

const CreateJourney = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<JourneyStackParamList, 'CreateJourney'>;
}) => {
  const levelListItem: LevelListItem[] = [
    {
      id: 1,
      color: theme.colors.greenSlope,
      value: 'BEGINNER',
      label: 'DÉBUTANT',
    },
    {
      id: 2,
      color: theme.colors.blueSlope,
      value: 'INTERMEDIATE',
      label: 'INTERMÉDIAIRE',
    },
    {
      id: 3,
      color: theme.colors.redSlope,
      value: 'EXPERIENCED',
      label: 'EXPÉRIMENTÉ',
    },
    {
      id: 4,
      color: theme.colors.blackSlope,
      value: 'PRO',
      label: 'PROFESSIONNEL',
    },
  ];

  const currentDomain = useSelector(
    (state: RootState) => state.tabSlice.currentDomain,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState<number>(2);
  const inx_default = 1;
  const [level, setLevel] = useState<Level>(levelListItem[inx_default].value);
  const [levelLabel, setLevelLabel] = useState<levelLabel>(
    levelListItem[inx_default].label,
  );
  const [color, setColor] = useState<string>(levelListItem[inx_default].color);

  const renderContent = (): JSX.Element => {
    return (
      <custom.SafeAreaView
        style={{
          backgroundColor: theme.colors.primary,
        }}
        statusBarStyle="light-content"
        statusBarColor={theme.colors.primary}
        insets={['top']}>
        <Header />
        <View
          style={{
            flexGrow: 1,
            backgroundColor: theme.colors.background,
            paddingVertical: 5,
          }}>
          <ButtonBack
            containerStyle={{
              paddingHorizontal: 8,
              paddingVertical: 16,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{paddingTop: 16, paddingHorizontal: 16}}>
            <Text style={{...components.Typography.Titleh2}}>
              Créer un trajet sur mesure
            </Text>
          </View>
          <View style={{paddingTop: 16, paddingHorizontal: 16}}>
            <Text style={{...components.Typography.BodyL}}>
              Sélectionnez le niveau de difficulté et la durée de votre trajet
              pour l’adapter à vos envies.
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 24,
                paddingHorizontal: 16,
                gap: 12,
              }}>
              <Text style={{...components.Typography.Titleh4}}>Niveau</Text>
            </View>
            <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: '#ffffff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 16,
                  padding: 8,
                  borderRadius: 16,
                  marginTop: 8,
                  height: 56,
                }}>
                <View style={{paddingLeft: 8, marginVertical: 'auto'}}>
                  <View
                    style={{
                      marginVertical: 'auto',
                      backgroundColor: color,
                      aspectRatio: 1,
                      height: 24,
                      borderRadius: 100,
                    }}
                  />
                  <SelectLevelModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    options={levelListItem}
                    selected={level}
                    onSelect={item => {
                      setLevel(item.value);
                      setLevelLabel(item.label);
                      setColor(item.color);
                    }}
                  />
                </View>
                <View>
                  <View style={{gap: 10, flexDirection: 'row'}}>
                    <View style={{marginVertical: 'auto'}}>
                      <View
                        style={{marginVertical: 'auto', flexDirection: 'row'}}>
                        <Text
                          style={{
                            ...components.Typography.BodyL,
                            color: theme.colors.primary,
                          }}>
                          {levelLabel}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 'auto',
                    marginVertical: 'auto',
                    paddingHorizontal: 10,
                  }}>
                  <svg.Icon iconName="chevron down" stroke="#003A9B" />
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}>
              <Text style={{...components.Typography.Titleh4}}>Durée</Text>
            </View>
            <Slider
              style={{
                width: theme.sizes.deviceWidth - 32,
                height: 40,
                paddingHorizontal: 16,
              }}
              value={duration}
              minimumValue={1.5}
              maximumValue={4}
              step={0.1}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.primary + '20'}
              onValueChange={(value: number) => {
                const roundedValue = Math.round(value * 10) / 10;
                setDuration(roundedValue);
              }}
            />
            <View style={{paddingHorizontal: 16}}>
              <Text style={{...components.Typography.BodyL}}>
                {duration + 'h'}
              </Text>
            </View>
          </View>
          <components.Button
            iconForward={true}
            title={'Générer un trajet'}
            containerStyle={{
              paddingTop: 40,
              paddingHorizontal: 16,
              marginBottom: 50,
            }}
            textStyle={{color: theme.colors.onPrimary}}
            onPress={() => {
              navigation.navigate('JourneyDetails', {
                kind: 'generated',
                mode: 'create',
                duration: duration,
                id_ski_pass: currentDomain?.id,
                level: level,
              });
            }}
          />
        </View>
      </custom.SafeAreaView>
    );
  };

  return renderContent();
};

export default CreateJourney;
