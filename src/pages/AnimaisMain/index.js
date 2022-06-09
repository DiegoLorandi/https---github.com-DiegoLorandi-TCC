import { View, Button } from 'react-native'
import React from 'react'




const AnimaisMain = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Consultar Animal"
        onPress={() =>
          navigation.navigate('Consultar Animal')
        }
      />
      <Button
        title="Cadastrar Animal"
        onPress={() =>
          navigation.navigate('Cadastrar Animal')
        }
      />
      <Button
        title="Gerenciar Animais"
        onPress={() =>
          navigation.navigate('Gerenciar Animais')
        }
      />
    </View>
  );
};
export default AnimaisMain