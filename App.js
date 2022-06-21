import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import handleConnectivyChange from './handleEvents';

export default function App() {
  useEffect(() => {
    // NetInfo.addEventListener(handleConnectivyChange);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFE4C4" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
