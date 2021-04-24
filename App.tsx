import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'react-native';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import colors from './src/styles/colors';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data);
      }
    )

    return () => subscription.remove()
  }, [])

  if(!fontsLoaded) 
    return <AppLoading />

  return (
  <>
    <StatusBar 
      barStyle='dark-content'
      backgroundColor='transparent'
    />
    <Routes />
  </> 
  )
}

