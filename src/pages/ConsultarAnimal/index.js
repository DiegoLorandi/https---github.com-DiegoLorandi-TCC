import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { css } from './Css';
import { db } from '../../services/firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfoHelper from '../../helpers/NetInfoHelper';
import Radio from '../../components/Ratio';
import AnimalFirebaseCrud from '../../utils/AnimalFirebaseCrud';
import AnimalRealmCrud from '../../utils/AnimalRealmCrud';

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
  const [selected, setSelected] = useState(0);

  useEffect(() => {}, [searched]);

  const Read = async () => {
    setLoading(true);
    setNotFinded(false);
    if (NetInfoHelper.isConnected() === false) {
      const animal = await AnimalRealmCrud.Read(fetchIdAnimal);
      if (animal.length > 0) {
        setDataAnimal(animal);
        setEditable(true);
        setLoading(false);
      } else {
        setNotFinded(true);
        setLoading(false);
      }
      return;
    }
    try {
      const animal = await AnimalFirebaseCrud.Read(fetchIdAnimal);
      if (!animal.id) {
        setLoading(false);
        setNotFinded(true);
        return;
      }
      setDataAnimal({ ...animal });
      setEditable(true);
      setSearched(true);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  function setDataAnimal(data) {
    setShowDataAnimal(data.dataNascimento);
    setShowPesoAnimal(data.pesoAnimal || data.peso);
    setShowSexoAnimal(data.sexoAnimal);
    setShowRacaAnimal(data.racaAnimal);
    setShowStatusAnimal(data.statusAnimal);
  }

  const Update = async () => {
    try {
      const novoPeso = newPesoAnimal != showPesoAnimal && newPesoAnimal != null;
      const docId = await AnimalFirebaseCrud.Update(
        fetchIdAnimal,
        novoPeso ? newPesoAnimal : undefined,
      );

      alert('Dados Editados com sucesso');
      navigation.navigate('Gerenciar Animais', { docId: docId });
    } catch (error) {
      alert(error);
    }
  };
  const Delete = async () => {
    try {
      await AnimalFirebaseCrud.Delete(fetchIdAnimal);
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
      <Radio
        selected={selected}
        options={['Macho', 'Fêmea']}
        horizontal={true}
        onChangeSelect={(options, index) => {
          setNewSexoAnimal(options);
          setSelected(index);
        }}
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
