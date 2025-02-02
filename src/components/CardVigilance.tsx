import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {theme} from '../constants';
import Typography from './Typography';
import {svg} from '../assets/svg';
type Props = {
  containerStyle?: ViewStyle;
};
const CardVigilance: React.FC<Props> = ({containerStyle}): JSX.Element => {
  return (
    <View
      style={{
        width: '100%',
        ...theme.shadowStyle.shadowContainer,
        ...containerStyle,
      }}>
      <View
        style={{
          width: '100%',
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 24,
          borderRadius: 16,
          backgroundColor: '#ffffff',
        }}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <View
            style={{  width: 24,  height: 24, marginVertical: 'auto' }}>
            <View style={{margin: 'auto'}}><Text style={{...Typography.BodyL}}>❗</Text></View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...Typography.BodyL}}>Reste vigilant sur les pistes </Text>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <View
            style={{  width: 24,  height: 24, marginVertical: 'auto' }}>
            <View style={{margin: 'auto'}}><Text style={{...Typography.BodyL}}>⛷</Text></View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...Typography.BodyL}}>Maitrise ta vitesse </Text>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <View
            style={{  width: 24,  height: 24, marginVertical: 'auto' }}>
            <View style={{margin: 'auto'}}><Text style={{...Typography.BodyL}}>👀</Text></View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...Typography.BodyL}}>Regarde en amont et en aval </Text>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <View
            style={{  width: 24,  height: 24, marginVertical: 'auto' }}>
            <View style={{margin: 'auto'}}><Text style={{...Typography.BodyL}}>✋</Text></View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...Typography.BodyL}}>Arrête toi sur le bord des pistes </Text>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <View
            style={{  width: 24,  height: 24, marginVertical: 'auto' }}>
            <View style={{margin: 'auto'}}><Text style={{...Typography.BodyL}}>🚧️</Text></View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...Typography.BodyL}}>Respecte le balisage et la signalisation </Text>
          </View>
        </View>

      </View>
    </View>
  );
};
export default CardVigilance;
