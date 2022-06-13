import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { css } from './Css';
import { db } from '../../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ConsultarAnimal = ({ navigation }) => {
  const [editable, setEditable] = useState(false);
  const [fetchIdAnimal, setFetchIdAnimal] = useState('');
  const [showDataAnimal, setShowDataAnimal] = useState('');
  const [showPesoAnimal, setShowPesoAnimal] = useState('');
  const [showSexoAnimal, setShowSexoAnimal] = useState('');
  const [showRacaAnimal, setShowRacaAnimal] = useState('');
  const [showStatusAnimal, setShowStatusAnimal] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFinded, setNotFinded] = useState(false);

  const [newDataAnimal, setNewDataAnimal] = useState(null);
  const [newPesoAnimal, setNewPesoAnimal] = useState(null);
  const [newSexoAnimal, setNewSexoAnimal] = useState(null);
  const [newRacaAnimal, setNewRacaAnimal] = useState(null);
  const [newStatusAnimal, setNewStatusAnimal] = useState(null);

  useEffect(() => {
    console.log(`Searched: ${searched}`);
  }, [searched]);

  const Read = async () => {
    setLoading(true);
    setNotFinded(false);
    const animaisCollection = db.collection('animais');
    try {
      var getAnimais = await animaisCollection
        .where('idAnimal', '==', '' + fetchIdAnimal + '')
        .get();
      var dataAnimalBuscado;
      var pesoAnimalBuscado;
      var sexoAnimalBuscado;
      var racaAnimalBuscado;
      var statusAnimalBuscado;
      var docId = '';
      var pesoId;
      getAnimais.forEach((doc) => {
        docId = doc.id;
        pesoId = doc.data().pesoId;
        dataAnimalBuscado = doc.data().dataNascimento;
        sexoAnimalBuscado = doc.data().sexoAnimal;
        racaAnimalBuscado = doc.data().racaAnimal;
        statusAnimalBuscado = doc.data().statusAnimal;
      });

      if (!docId) {
        setLoading(false);
        setNotFinded(true);
        return;
      }

      var getPesoAnimal = await animaisCollection
        .doc(docId)
        .collection('pesoAnimal')
        .doc('' + pesoId + '')
        .get();
      pesoAnimalBuscado = getPesoAnimal.data().pesoAnimal;

      setShowDataAnimal(dataAnimalBuscado);
      setShowPesoAnimal(pesoAnimalBuscado);
      setShowSexoAnimal(sexoAnimalBuscado);
      setShowRacaAnimal(racaAnimalBuscado);
      setShowStatusAnimal(statusAnimalBuscado);
      setEditable(true);
      setSearched(true);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };
  const Update = async () => {
    const animaisCollection = db.collection('animais');
    try {
      var docId = '';
      var pesoId;
      await animaisCollection
        .where('idAnimal', '==', '' + fetchIdAnimal + '')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            docId = doc.id;
            pesoId = doc.data().pesoId; //recebe o pesoId que está no documento
            newDataAnimal
              ? doc.ref.update({ dataNascimento: newDataAnimal })
              : '';
            newRacaAnimal ? doc.ref.update({ racaAnimal: newRacaAnimal }) : '';
            newSexoAnimal ? doc.ref.update({ sexoAnimal: newSexoAnimal }) : '';
            newStatusAnimal
              ? doc.ref.update({ statusAnimal: newStatusAnimal })
              : '';
          });
        });
      if (newPesoAnimal != showPesoAnimal && newPesoAnimal != null) {
        var newPesoId = pesoId + 1; //soma 1 na variável pesoId
        await animaisCollection
          .doc(docId)
          .set({ pesoId: newPesoId }, { merge: true }); //atualiza o pesoId do documento do animal
        await db
          .collection('animais')
          .doc(docId)
          .collection('pesoAnimal')
          .doc('' + newPesoId + '')
          .set({
            idAnimal: fetchIdAnimal,
            pesoAnimal: newPesoAnimal,
            data: new Date(),
          });
      }
      alert('Dados Editados com sucesso');
      navigation.navigate('Gerenciar Animais', { docId: docId });
    } catch (error) {
      alert(error);
    }
  };
  const Delete = async () => {
    try {
      const animaisCollection = db.collection('animais');
      const getAnimais = animaisCollection.where(
        'idAnimal',
        '==',
        '' + fetchIdAnimal + '',
      );
      await getAnimais.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      setFetchIdAnimal('');
      setShowDataAnimal('');
      setShowPesoAnimal('');
      setShowSexoAnimal('');
      setShowRacaAnimal('');
      setShowStatusAnimal('');
      alert('Animal Excluido');
      setEditable(false);
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  async function confirmRemove() {
    Alert.alert('Excluir dado', 'Deseja excluir esse animal?', [
      {
        text: 'Sim',
        onPress() {
          Delete();
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  const elementForm = () => (
    <View
      style={{
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 20,
        shadowOffset: {
          width: 5,
          height: -5,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
      }}
    >
      <Text style={css.label}>Data de Nascimento:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showDataAnimal}
        value={newDataAnimal}
        onChangeText={(text) => setNewDataAnimal(text)}
      />
      <Text style={css.label}>Peso:</Text>
      <TextInput
        editable={editable}
        style={css.input}
        multiline={false}
        defaultValue={showPesoAnimal}
        value={newPesoAnimal}
        onChangeText={(text) => setNewPesoAnimal(text)}
      />

      <Text style={css.label}>Sexo do Animal:</Text>
      <TextInput
        editable={editable}
        style={css.input}
        multiline={false}
        defaultValue={showSexoAnimal}
        value={newSexoAnimal}
        onChangeText={(text) => setNewSexoAnimal(text)}
      />

      <Text style={css.label}>Raca:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showRacaAnimal}
        value={newRacaAnimal}
        onChangeText={(text) => setNewRacaAnimal(text)}
      />

      <Text style={css.label}>Status:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showStatusAnimal}
        value={newStatusAnimal}
        onChangeText={(text) => setNewStatusAnimal(text)}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <TouchableOpacity
          onPress={Update}
          style={{
            ...css.button,
            flex: 0.5,
            backgroundColor: '#007bff',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Editar dados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={confirmRemove}
          style={{
            ...css.button,
            flex: 0.5,
            backgroundColor: '#dc3545',
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Excluir Animal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const elementSearch = () => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: searched === false ? 150 : 10,
      }}
    >
      <TextInput
        style={{
          backgroundColor: '#ffffff',
          padding: 5,
          borderColor: '#f1f3f4',
          borderRadius: 2,
          flex: 0.9,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        }}
        editable={!searched}
        keyboardType="numeric"
        placeholder="Digite o Id do animal"
        value={fetchIdAnimal}
        onChangeText={(value) => setFetchIdAnimal(value)}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.1,
          backgroundColor: '#33aaff',
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Icon size={14} name="search" color="#ffffff" onPress={Read} />
      </View>
    </View>
  );

  return (
    <ScrollView style={searched === false ? { flex: 1 } : {}}>
      {/* <Text>Consultar Animais</Text> */}
      <Animatable.View animation="fadeInUp">
        {elementSearch()}
        {notFinded && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Nenhum dado encontrado com esse id...
            </Text>
          </View>
        )}
        {loading && <ActivityIndicator size="large"></ActivityIndicator>}
        {searched && elementForm()}
      </Animatable.View>
    </ScrollView>
  );
};

export default ConsultarAnimal;
