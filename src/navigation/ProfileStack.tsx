import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../screens/tabs/profile/Profile';
import AccountInfo from '../screens/tabs/profile/AccountInfo';
import PrivacyPolicy from '../screens/tabs/profile/PrivacyPolicy';
import About from '../screens/tabs/profile/About';
import UsagePolicy from '../screens/tabs/profile/UsagePolicy';
import {ProfileStackParamList} from '../types/navigation';
import LegalPolicy from '../screens/tabs/profile/LegalPolicy';
import GoBackHeader from '../components/navigation/GoBackHeader';
import PolicyWebView from '../screens/tabs/profile/PolicyWebView';
import AccountDelete from '../screens/tabs/profile/AccountDelete';
import UserProfile from '../screens/tabs/UserProfile';
import Friends from '../screens/Friends';
import FriendRequests from '../screens/FriendRequests';
import AddFriend from '../screens/AddFriend';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  const Header = useCallback(() => <GoBackHeader outlined />, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: Header,
      }}>
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: '',
        }}
      /> */}
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="Friends"
        component={Friends}
      />
      <Stack.Screen
        name="FriendRequests"
        component={FriendRequests}
      />
       <Stack.Screen
        name="AddFriend"
        component={AddFriend}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{title: 'Informations personnelles'}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{title: 'Politique de confidentialité'}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{title: 'À propos de moi'}}
      />
      <Stack.Screen
        name="UsagePolicy"
        component={UsagePolicy}
        options={{title: "Conditions d'utilisation"}}
      />
      <Stack.Screen
        name="LegalPolicy"
        component={LegalPolicy}
        options={{title: 'Mentions légales'}}
      />
      <Stack.Screen
        name="PolicyWebView"
        component={PolicyWebView}
        options={{title: 'Mentions légales'}}
      />
      <Stack.Screen
        name="AccountDelete"
        component={AccountDelete}
        options={{title: 'Mentions légales'}}
      />
    </Stack.Navigator>
  );
}
