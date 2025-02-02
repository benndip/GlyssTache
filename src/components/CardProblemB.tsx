import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {theme} from '../constants';
import {components} from '.';
import {svg} from '../assets/svg';
type Props = {
  containerStyle?: ViewStyle;
};
const CardProblemB: React.FC<Props> = ({containerStyle}): JSX.Element => {
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
            style={{
              width: 24,
              height: 24,
              marginVertical: 'auto',
            }}>
            <View style={{margin: 'auto'}}>
              <svg.Icons iconName="environment_water_drop" stroke={'#003A9B'} />
            </View>
          </View>
          <View style={{marginVertical: 'auto', paddingRight: 32}}>
            <Text style={{...components.Typography.Titleh4}}>
            En cas de mauvaise visibilité ou météo :
            </Text>
          </View>
        </View>
        <View>
          <Text style={{...components.Typography.BodyM}}>
          • Restez calme, évaluez la situation.{"\n\n"}
          • Appelez les secours.{"\n\n"}
          • Fournissez votre position exacte (piste, balise, altitude, etc.).{"\n\n"}
          • Assurez-vous de signaler votre présence sur la piste (croix en skis, vêtements visibles).{"\n"}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CardProblemB;
