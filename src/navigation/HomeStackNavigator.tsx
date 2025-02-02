import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '../types/navigation';
import Home from '../screens/tabs/Home';
import Location from '../screens/tabs/Location';
import DiscoverNewFeature from '../screens/tabs/DiscoverNewFeature';
import GoBackHeader from '../components/navigation/GoBackHeader';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="NewFeature"
        component={DiscoverNewFeature}
        options={{headerShown: true, header: GoBackHeader}}
      />
      <HomeStack.Screen name="Location" component={Location} />
    </HomeStack.Navigator>
  );
}
