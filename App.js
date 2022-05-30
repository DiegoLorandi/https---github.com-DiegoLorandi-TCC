import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text,View} from 'react-native';
import Page from './views/Page';
import {css} from './assets/css/Css';

export default function App() {

  const props={
    autor : "Ciro",
    texto : "Vai Vasco"
  }

  return (
    <View style={css.container}>
      <Text style={css.loginButtom}>Faça seu Login</Text>
      <Page {...props} /> 
      <Page autor="Diego" texto="Vai Corinthians" /> 
      <StatusBar style="auto" />
    </View>
  );
}