import {
  View,
  FlatList,
  Text,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TodoList from '../../components/TodoList';
import { css } from './Css';
import NetInfoHelper from '../../helpers/NetInfoHelper';
import CompradorFirebaseCrud from '../../utils/CompradorFirebaseCrud';
import CompradorRealmCrud from '../../utils/CompradorRealmCrud';

const GerenciarCompradores = ({ navigation, route }) => {
  const [idRemoved, setIdRemoved] = useState('');
  const [compradores, setCompradores] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableConfigs = {
    title: ['Nome', 'Telefone', ''],
    widths: [100, 130],
  };

  useEffect(() => {
    getCompradores();
  }, [route, idRemoved]);

  async function getCompradores() {
    setLoading(true);
    var allCompradores = [];
    if (NetInfoHelper.isConnected()) {
      allCompradores = await CompradorFirebaseCrud.Read();
    } else {
      // Offline
      allCompradores = await CompradorRealmCrud.Read();
    }
    setLoading(false);
    setCompradores(allCompradores);
  }

  async function deleteData(comprador) {
    CompradorFirebaseCrud.Delete(comprador, (doc) => {
      let currentCompradores = compradores.filter(
        (currentComprador) => currentComprador.email != comprador.email,
      );
      setCompradores(currentCompradores);
      setIdRemoved(doc.id);
    });
  }

  async function confirmRemove(animal) {
    Alert.alert('Excluir dado', 'Deseja excluir esse comprador?', [
      {
        text: 'Sim',
        onPress() {
          deleteData(animal);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  const elementoLista = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#34e75d',
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {tableConfigs &&
          tableConfigs['title'].map((title, index) => (
            <Text
              style={{
                width: tableConfigs.widths[index],
                fontWeight: 'bold',
                paddingLeft: index === 0 ? 5 : 0,
                paddingRight:
                  index === tableConfigs['title'].length - 1 ? 5 : 0,
              }}
            >
              {title}
            </Text>
          ))}
      </View>
      <FlatList
        data={compradores}
        keyExtrator={(dado) => String(dado.id)}
        style={{ marginTop: 0 }}
        renderItem={({ item }) => (
          <TodoList
            item={item}
            editCb={() => navigation.navigate('AtualizarComprador', item)}
            removeCb={() => {
              confirmRemove(item);
            }}
            navigation={navigation}
            chaves={['nome', 'telefone']}
            widthArray={tableConfigs.widths}
          />
        )}
      />
    </>
  );

  const elementNenhumDado = () => (
    <>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        Nenhum comprador cadastrado.
      </Text>
      <Button
        style={{ marginTop: 20 }}
        title="Cadastre um comprador"
        onPress={() => navigation.navigate('Cadastrar Comprador')}
      ></Button>
    </>
  );

  return (
    <View
      style={compradores && compradores.length === 0 ? css.nenhumDado : null}
    >
      {compradores && compradores.length > 0 ? (
        elementoLista()
      ) : loading == false ? (
        elementNenhumDado()
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
    </View>
  );
};

export default GerenciarCompradores;
