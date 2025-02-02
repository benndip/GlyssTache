import React, {useEffect, useState} from 'react';
import MapboxNavigation from '../../../map/src';
import {View, Text, Pressable} from 'react-native';
import {custom} from '../../../custom';
import {theme} from '../../../constants';
import {svg} from '../../../assets/svg';
import {components} from '../../../components';
import {getToken} from '../../../utils/authUtils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JourneyStackParamList} from '../../../types/navigation';
import Header from '../../../components/Header';

const JourneyMap = ({
  navigation,
  route,
}: NativeStackScreenProps<JourneyStackParamList, 'JourneyMap'>) => {
  const {kind, id} = route.params;

  const [token, setToken] = useState<string | null>(null);
  // Fetch token on mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();

        setToken(fetchedToken); // Store the token once resolved
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);
  // SOS component
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
            navigation.navigate('JourneyProblem', {kind: kind, id});
          }}>
          <svg.Icon iconName="chevron right" stroke={'#ffffff'} />
        </Pressable>
      </View>
    );
  }

  if (!token) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}>
        <components.Loader />
      </View>
    );
  }
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
          position: 'relative',
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <MapboxNavigation
          style={{flex: 1}}
          id={id?.toString() || ''}
          kind={kind}
          token={token ?? ''}
          startOrigin={{latitude: 48.858093, longitude: 2.294694}}
          destination={{latitude: 48.990716, longitude: 2.252026}}
          showsEndOfRouteFeedback={false}
          shouldSimulateRoute={false}
          onCancelNavigation={() => {
            navigation.replace('Journeys');
          }}
          language="fr"
        />
      </View>
    </custom.SafeAreaView>
  );
};

export default JourneyMap;
