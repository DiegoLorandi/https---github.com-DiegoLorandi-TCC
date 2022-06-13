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

const GerenciarAnimais = ({ navigation, route }) => {
  const [idRemoved, setIdRemoved] = useState('');
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableConfigs = {
    title: ['Raça', 'Sexo', ''],
    widths: [100, 130],
  };

  useEffect(() => {
    console.log('useEffects()');
    getAnimais();
  }, [route, idRemoved]);

  async function getAnimais() {
    setLoading(true);
    const animaisCollection = db.collection('animais');
    const animaisObject = await animaisCollection.get();
    var allAnimais = [];
    animaisObject.forEach(async (doc) => {
      if (doc.data().idAnimal) {
        allAnimais.push({
          id: doc.id,
          idAnimal: doc.data().idAnimal,
          pesoId: doc.data().pesoId,
          dataAnimalBuscado: doc.data().dataNascimento,
          sexoAnimalBuscado: doc.data().sexoAnimal,
          racaAnimalBuscado: doc.data().racaAnimal,
          statusAnimalBuscado: doc.data().statusAnimal,
        });
      }
    });
    setLoading(false);
    setAnimais(allAnimais);
  }

  async function deleteData(animal) {
    const animaisCollection = db.collection('animais');
    const getAnimais = animaisCollection.where(
      'idAnimal',
      '==',
      '' + animal.idAnimal + '',
    );
    await getAnimais.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setAnimais(currentAnimais);
        setIdRemoved(doc.id);
        console.log('removeu com sucesso!');
        console.log(animais);
        let currentAnimais = animais.filter(
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
        data={animais}
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
            chaves={['racaAnimalBuscado', 'sexoAnimalBuscado']}
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
    <View style={animais && animais.length === 0 ? css.nenhumDado : null}>
      {animais && animais.length > 0 ? (
        elementoLista()
      ) : loading == false ? (
        elementNenhumDado()
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
    </View>
  );
};

export default GerenciarAnimais;
