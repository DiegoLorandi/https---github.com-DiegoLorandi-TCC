import { StatusBar } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/pages/Login'
import Teste from './src/pages/Teste'
import Routes from './src/routes'

export default function App() {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFE4C4" barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>
  );
}