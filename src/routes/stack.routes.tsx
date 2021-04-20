import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }, 
    }}
  >
    <stackRoutes.Screen name="welcome" component={Welcome} />

    <stackRoutes.Screen name="identification" component={UserIdentification} />

    <stackRoutes.Screen name="confirmation" component={Confirmation} />

  </stackRoutes.Navigator>
);

export default AppRoutes;