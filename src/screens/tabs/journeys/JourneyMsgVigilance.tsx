import React from 'react';
import {View, Text} from 'react-native';
import {custom} from '../../../custom';
import {theme} from '../../../constants';
import {components} from '../../../components';
import {JourneyStackParamList} from '../../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import CardVigilance from '../../../components/CardVigilance';

const JourneyMsgVigilance = ({
  route,
  navigation,
}: NativeStackScreenProps<JourneyStackParamList, 'JourneyMsgVigilance'>) => {
  const {kind, id} = route.params;
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
          <View
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                ...components.Typography.Titleh2,
              }}>
              Hop Hop Hop, ne pars pas si vite…
            </Text>
          </View>
          <View
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                ...components.Typography.BodyL,
              }}>
              Glyss est là pour te guider sur les pistes, à toi de rester maître
              de ta vitesse et de ton environnement.{' '}
            </Text>
          </View>
          <CardVigilance
            containerStyle={{
              paddingTop: 16,
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          />
          <components.Button
            iconForward={true}
            title={'C’est parti !'}
            containerStyle={{paddingTop: 16, paddingHorizontal: 16}}
            textStyle={{color: theme.colors.onPrimary}}
            onPress={() => {
              navigation.navigate('JourneyMap', {kind: kind, id});
            }}
          />
        </View>
      </custom.SafeAreaView>
    );
  };
  return renderContent();
};

export default JourneyMsgVigilance;
