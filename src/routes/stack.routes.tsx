import React from 'react'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';
import AuthRoutes from './tabs.routes';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};


const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <stackRoutes.Screen name="welcome" component={Welcome} />
    <stackRoutes.Screen name="identification" component={UserIdentification} />
    <stackRoutes.Screen name="confirmation" component={Confirmation} />
    <stackRoutes.Screen name="plantSelect" component={AuthRoutes} />
    <stackRoutes.Screen name="plantSave" component={PlantSave} />
    <stackRoutes.Screen name="myPlants" component={AuthRoutes} />

  </stackRoutes.Navigator>
);

export default AppRoutes;