import { View, TouchableOpacity, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

const CompradoresMain = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#28a745',
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: 6,
            paddingTop: 6,
            borderRadius: 2,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Cadastrar Comprador')}
        >
          <Icon
            size={14}
            name="plus"
            color="#ffffff"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Cadastrar Comprador
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#2196f3',
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: 6,
            paddingTop: 6,
            borderRadius: 2,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Consultar Comprador')}
        >
          <Icon
            size={14}
            name="search"
            color="#ffffff"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Consultar Comprador
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#17a2b8',
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: 6,
            paddingTop: 6,
            borderRadius: 2,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Gerenciar Comprador')}
        >
          <Icon
            size={14}
            name="pen"
            color="#ffffff"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Gerenciar Comprador
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CompradoresMain;
