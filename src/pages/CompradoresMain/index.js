import { View, Button } from 'react-native'
import React from 'react'



const CompradoresMain = ({ navigation }) => {
  return (
    <View >
      <Button
        title="Cadastrar Comprador"
        onPress={() =>
          navigation.navigate('Cadastrar Comprador')
        }
      />
      <Button
        title="Consultar Comprador"
        onPress={() =>
          navigation.navigate('Consultar Comprador')
        }
      />
      <Button
        title="Gerenciar Comprador"
        onPress={() =>
          navigation.navigate('Gerenciar Comprador')
        }
      />
    </View>
  );
};
export default CompradoresMain