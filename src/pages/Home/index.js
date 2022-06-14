import { View, Button, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { auth } from '../../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfoHelper from '../../helpers/NetInfoHelper';
import getRealm from '../../services/realm';
const Home = ({ navigation }) => {
  const handleSignOut = async () => {
    if (NetInfoHelper.isConnected()) {
      auth
        .signOut()
        .then(() => {
          navigation.replace('Login');
        })
        .catch((error) => alert(error.message));
    }
    const realm = await getRealm();
    realm.write(() => {
      realm.delete(realm.objects('Usuario'));
    });
    realm.close();
  };
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
          onPress={() => navigation.navigate('Cadastrar Animal')}
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
            Cadastrar Animal
          </Text>
        </TouchableOpacity>
      </View>

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
          onPress={() => navigation.navigate('Consultar Animal')}
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
            Consultar Animal
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

      <View style={{ marginBottom: 10 }}>
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
          onPress={() => navigation.navigate('Gerenciar Animais')}
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
            Gerenciar Animais
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 50 }}>
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

      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#dc3545',
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: 6,
            paddingTop: 6,
            borderRadius: 2,
            alignItems: 'center',
          }}
          onPress={() => handleSignOut()}
        >
          <Icon
            size={14}
            name="sign-out-alt"
            color="#ffffff"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
