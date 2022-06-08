import { View, Button} from 'react-native'
import * as React from 'react';
const Home = ({ navigation }) => {
  return (
    <View>
      <Button
      title="Ir para ConsultarInfo"
      onPress={() =>
        navigation.navigate('ConsultarInfo')
      }
      />
    </View>
  );
};
export default Home
