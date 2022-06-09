import { View, Button } from 'react-native'
import * as React from 'react';
const Home = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Gerar Relatórios"
        onPress={() =>
          navigation.navigate('Gerar Relatórios')
        }
      />
    </View>
  );
};
export default Home
