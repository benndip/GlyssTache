import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForYouStackParamList} from '../types/navigation';
import PartnerDetails from '../components/forYou/PartnerDetails';
import Social from '../screens/tabs/Partner';

const ForYouStack = createNativeStackNavigator<ForYouStackParamList>();
export default function ForYouStackNavigator() {
  return (
    <ForYouStack.Navigator screenOptions={{headerShown: false}}>
      <ForYouStack.Screen name="Partners" component={Social} />
      <ForYouStack.Screen name="PartnerDetails" component={PartnerDetails} />
    </ForYouStack.Navigator>
  );
}
