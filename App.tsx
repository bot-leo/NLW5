import React from 'react'
import AppLoading from 'expo-app-loading'

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost'

import { Welcome } from './src/views/Welcome'

export default function App() {

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Welcome/>
  );
}
