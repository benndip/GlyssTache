import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Social from '../screens/tabs/Social';
import {
  HomeTabSvg,
  ProfileTabSvg,
  SocialTabSvg,
  PartnerTabSvg,
  JourneysTabSvg,
} from '../utils/getTabs';
import TabBarHeader from '../components/navigation/TabBarHeader';
import ForYouStackNavigator from './ForYouStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import JourneysStackNavigator from './JourneysStackNavigator';
import ProfileStack from './ProfileStack';

const Tabs = createBottomTabNavigator();
export default function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        header: TabBarHeader,
        tabBarLabelStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: HomeTabSvg,
        }}
      />
      <Tabs.Screen
        name="Trajets"
        component={JourneysStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: JourneysTabSvg,
        }}
      />
      <Tabs.Screen
        name="Partner"
        component={ForYouStackNavigator}
        options={{
          tabBarIcon: PartnerTabSvg,
        }}
      />
      <Tabs.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: SocialTabSvg,
        }}
      />
      <Tabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ProfileTabSvg,
        }}
      />
    </Tabs.Navigator>
  );
}
