import React from 'react';
import {View, Text, Pressable, Linking, Alert, Platform} from 'react-native';
import {custom} from '../../../custom';
import {theme} from '../../../constants';
import {svg} from '../../../assets/svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JourneyStackParamList} from '../../../types/navigation';
import Header from '../../../components/Header';
import CardProblemA from '../../../components/CardProblemA';
import CardProblemB from '../../../components/CardProblemB';
import Button from '../../../components/Button';

const makeSosCall = () => {
  const emergencyNumber = '112';
  const url = `tel:${emergencyNumber}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url).catch(err => {
          Alert.alert('Error', 'Unable to open the dialer.');
        });
      } else {
        Alert.alert(
          'Call not supported',
          Platform.OS === 'android'
            ? 'Your device does not support making calls.'
            : 'Call functionality is unavailable.',
        );
      }
    })
    .catch(err => {
      Alert.alert('Error', 'An unexpected error occurred.');
    });
};

const JourneyProblem = ({
  route,
  navigation,
}: NativeStackScreenProps<JourneyStackParamList, 'JourneyProblem'>) => {
  const {kind, id} = route.params;
  function sos() {
    return (
      <View
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: 'rgba(176, 18, 48, 1)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{marginVertical: 'auto'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 1)',
              fontFamily: 'DM Sans',
              fontSize: 20,
              fontWeight: 600,
            }}>
            {`Un problème sur les pistes ?`}
          </Text>
        </View>

        <Pressable
          style={{
            marginVertical: 'auto',
          }}
          onPress={() => {
            navigation.navigate('JourneyMap', {kind: kind, id});
          }}>
          <svg.Icons iconName="edit_close_circle" stroke={'#ffffff'} />
        </Pressable>
      </View>
    );
  }
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
        {sos()}

        <View
          style={{
            flexGrow: 1,
            backgroundColor: theme.colors.background,
            paddingVertical: 5,
          }}>
          <CardProblemA
            containerStyle={{
              paddingTop: 16,
              paddingHorizontal: 16,
            }}
          />
          <CardProblemB
            containerStyle={{
              paddingTop: 16,
              paddingHorizontal: 16,
            }}
          />
          <Button
            title={'Appeler les secours en montagne'}
            containerStyle={{paddingTop: 16, paddingHorizontal: 16}}
            LinearGradientColor={{
              disabled: ['#9CACC6', '#9CACC6'],
              active: ['#B01230', '#B01230'],
            }}
            textStyle={{color: theme.colors.onPrimary}}
            onPress={() => {
              makeSosCall;
            }}
          />
        </View>
      </custom.SafeAreaView>
    );
  };
  return renderContent();
};

export default JourneyProblem;
