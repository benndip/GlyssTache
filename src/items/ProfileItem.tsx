import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
interface Props {
  title: string;
  icon?: JSX.Element;
  onPress?: () => void;
  emailVerify?: boolean;
  goNavigation?: boolean;
  containerStyle?: ViewStyle;
}
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {BodyS} from '../components/Typography';
import {spaces} from '../constants/spaces';
const ProfileItem: React.FC<Props> = ({
  icon,
  title,
  onPress,
  goNavigation,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: spaces.md,
        backgroundColor: theme.colors.onPrimary,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: theme.colors.border,
        paddingHorizontal: spaces.md,
        gap: spaces.md,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{marginVertical: 'auto'}}>{icon}</View>
      <View style={{marginVertical: 'auto'}}>
        <BodyS style={{marginVertical: 'auto'}}>{title}</BodyS>
      </View>
      <View style={{marginVertical: 'auto', marginLeft: 'auto'}}>
        <svg.Icons iconName="arrow_chevron_right_md" />
      </View>
    </TouchableOpacity>
  );
};
export default ProfileItem;
