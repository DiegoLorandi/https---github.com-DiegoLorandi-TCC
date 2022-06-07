import { View, Button} from 'react-native'
import * as React from 'react';
const Home = ({ navigation }) => {

  return (
    <View>
      <Button
      title="Ir para Login"
      onPress={() =>
        navigation.navigate('Login')
      }
      />
    </View>
  );
};
export default Home
