import React from 'react';
import {View} from 'react-native';

import {items} from '../../../items';
import {svg} from '../../../assets/svg';
import {theme} from '../../../constants';
import {components} from '../../../components';
import {spaces} from '../../../constants/spaces';
import ProfileLayout from '../../../components/profile/ProfileLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../../types/navigation';

type ProfileProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
const Profile: React.FC<ProfileProps> = ({navigation}: ProfileProps) => {
  return (
    <ProfileLayout
      title="Réglages"
      contentContainerStyle={{
        paddingTop: spaces.xl,
      }}>
      
    </ProfileLayout>
  );
};
export default Profile;
