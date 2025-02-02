import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import {theme} from '../constants';
import {components} from '.';
import {svg} from '../assets/svg';
type Props = {
  title?: string;
  containerStyle?: ViewStyle;
  text: string;
  isbutton?: boolean;
  buttonLabel?: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  onTextPress?: () => void;
};
const CardInfoActions: React.FC<Props> = ({
  containerStyle,
  title = '',
  text = '',
  buttonLabel = '',
  isbutton = true,
  onPress,
  textStyle,
  onTextPress,
}): JSX.Element => {
  return (
    <View
      style={{
        width: '100%',
        ...theme.shadowStyle.shadowContainer,
        ...containerStyle,
      }}>
      <View
        style={{
          flex: 1,
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 24,
          borderRadius: 16,
          backgroundColor: '#ffffff',
        }}>
        {title !== '' && (
          <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
            <View
              style={{
                position: 'relative',
                width: 48,
                height: 48,
                borderRadius: 100,
                backgroundColor: theme.colors.background + 90,
                marginVertical: 'auto',
              }}>
              <View style={{margin: 'auto'}}>
                <svg.Icon iconName="app futur" stroke={'#003A9B'} />
              </View>
            </View>
            <View style={{marginVertical: 'auto', paddingRight: 32}}>
              <Text style={{...components.Typography.Titleh4}}> {title}</Text>
            </View>
          </View>
        )}
        <View>
          <Text
            style={{...components.Typography.BodyL, ...textStyle}}
            onPress={onTextPress}>
            {text}
          </Text>
        </View>
        {isbutton && (
          <components.Button
            iconForward={true}
            touchableOpacityStyle={{paddingHorizontal: 16, width: '100%'}}
            title={buttonLabel}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};
export default CardInfoActions;
