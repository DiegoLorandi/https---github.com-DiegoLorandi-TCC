import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Page from './views/Page'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  {/*criação de variável*/}
  const props={
    autor : "Ciro",
    texto : "Vai Vasco"
  }
  
  return (
    <View style={styles.container}>
      <Page {...props} /> {/*passando variável "props" para função Page*/}
      <Page autor="Diego" texto="Vai Corinthians" /> {/*passando as propriedades para a função "Page"*/}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
