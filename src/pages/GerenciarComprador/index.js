import {
  View,
  FlatList,
  Text,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import getRealm from '../../services/realm';
import { db } from '../../../firebase';
import TodoList from '../../components/TodoList';
import { css } from './Css';

const GerenciarCompradores = ({ navigation, route }) => {
  const [idRemoved, setIdRemoved] = useState('');
  const [compradores, setCompradores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editable, setEditable] = useState(false);
  const [fetchCpfComprador, setFetchCpfComprador] = useState('');
  const [showTelefoneComprador, setShowTelefoneComprador] = useState('');
  const [showNomeComprador, setShowNomeComprador] = useState('');
  const [showCepComprador, setShowCepComprador] = useState('');
  const [showNumeroComprador, setShowNumeroComprador] = useState('');
  const [showRuaComprador, setShowRuaComprador] = useState('');
  const [showBairroComprador, setShowBairroComprador] = useState('');
  const [showMunicipioComprador, setShowMunicipioComprador] = useState('');
  const [showEstadoComprador, setShowEstadoComprador] = useState('');
  const [showEmailComprador, setShowEmailComprador] = useState('');

  const [newTelefoneComprador, setNewTelefoneComprador] = useState();
  const [newNomeComprador, setNewNomeComprador] = useState(null);
  const [newCepComprador, setNewCepComprador] = useState(null);
  const [newNumeroComprador, setNewNumeroComprador] = useState(null);
  const [newRuaComprador, setNewRuaComprador] = useState(null);
  const [newBairroComprador, setNewBairroComprador] = useState(null);
  const [newMunicipioComprador, setNewMunicipioComprador] = useState(null);
  const [newEstadoComprador, setNewEstadoComprador] = useState(null);
  const [newEmailComprador, setNewEmailComprador] = useState(null);

  const tableConfigs = {
    title: ['Nome', 'Telefone', ''],
    widths: [100, 130],
  };

  useEffect(() => {
    getCompradores();
  }, [route, idRemoved]);

  async function getCompradores() {
    setLoading(true);
    const compradoresCollection = db.collection('compradores');
    const getCompradores = await compradoresCollection.get();
    var allCompradores = [];
    getCompradores.forEach(async (doc) => {
      if (doc.id) {
        allCompradores.push({
          id: doc.id,
          telefone: doc.data().telefone,
          nome: doc.data().nome,
          cep: doc.data().cep,
          numero: doc.data().numero,
          rua: doc.data().rua,
          bairro: doc.data().bairro,
          municipio: doc.data().municipio,
          estado: doc.data().estado,
          email: doc.data().email,
        });
      }
    });
    setLoading(false);
    setCompradores(allCompradores);
  }

  async function deleteData(comprador) {
    const compradoresCollection = db.collection('compradores');
    const getComprador = compradoresCollection.where(
      'email',
      '==',
      '' + comprador.email + '',
    );
    await getComprador.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setAnimais(currentAnimais);
        setIdRemoved(doc.id);
        let currentAnimais = compradores.filter(
          (currentAnimal) => currentAnimal.idAnimal != animal.idAnimal,
        );
        doc.ref.delete();
      });
    });
  }

  async function confirmRemove(animal) {
    Alert.alert('Excluir dado', 'Deseja excluir esse animal?', [
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
            editCb={() => navigation.navigate('AtualizarAnimal', item)}
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
        Nenhum animal cadastrado.
      </Text>
      <Button
        style={{ marginTop: 20 }}
        title="Cadastre um animal"
        onPress={() => navigation.navigate('Cadastrar Animal')}
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
