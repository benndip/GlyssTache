import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JourneyStackParamList} from '../types/navigation';
import JourneyMap from '../screens/tabs/journeys/JourneyMap';
import JourneyMsgVigilance from '../screens/tabs/journeys/JourneyMsgVigilance';
import CreateJourney from '../screens/tabs/journeys/CreateJourney';
import JourneysActions from '../screens/tabs/journeys/JourneysActions';
import JourneyProblem from '../screens/tabs/journeys/JourneyProblem';
import JourneyDetails from '../screens/tabs/journeys/JourneyDetails';
import TabBarHeader from '../components/navigation/TabBarHeader';
import Journeys from '../screens/tabs/journeys/Journeys';

const TargestStack = createNativeStackNavigator<JourneyStackParamList>();

export default function JourneysStackNavigator() {
  return (
    <TargestStack.Navigator screenOptions={{headerShown: false}}>
      <TargestStack.Screen
        name="Journeys"
        component={Journeys}
        options={{header: TabBarHeader, headerShown: true}}
      />
      <TargestStack.Screen name="JourneyMap" component={JourneyMap} />
      <TargestStack.Screen
        name="JourneyMsgVigilance"
        component={JourneyMsgVigilance}
      />
      <TargestStack.Screen name="CreateJourney" component={CreateJourney} />
      <TargestStack.Screen name="JourneyDetails" component={JourneyDetails} />
      <TargestStack.Screen name="JourneysActions" component={JourneysActions} />

      <TargestStack.Screen name="JourneyProblem" component={JourneyProblem} />
    </TargestStack.Navigator>
  );
}
