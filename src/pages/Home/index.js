import { View, Button } from 'react-native'
import * as React from 'react';
import { auth } from '../../../firebase';
const Home = ({ navigation }) => {
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace('Login')
    }).catch((error) => alert(error.message))
  }
  return (
    <View>
      <Button
        title="Gerar Relatórios"
        onPress={() =>
          navigation.navigate('Gerar Relatórios')
        }
      />
      <Button
        title="Sair"
        onPress={handleSignOut}
      />
    </View>
  );
};
export default Home
