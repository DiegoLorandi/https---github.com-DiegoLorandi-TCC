import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { css } from './Css';
import { db } from '../../services/firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfoHelper from '../../helpers/NetInfoHelper';
import CompradorFirebaseCrud from '../../utils/CompradorFirebaseCrud';
import CompradorRealmCrud from '../../utils/CompradorRealmCrud';

const ConsultarComprador = ({ navigation }) => {
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

  const [notFinded, setNotFinded] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compradorData, setCompradorData] = useState(undefined);

  const Read = async () => {
    if (NetInfoHelper.isConnected() === false) {
      const comprador = CompradorRealmCrud.Read(fetchCpfComprador);
      if (comprador.length > 0) {
        setDadosComprador(comprador);
        setEditable(true);
        setSearched(true);
        setNotFinded(false);
        setLoading(false);
      } else {
        setLoading(false);
        setNotFinded(true);
      }
    } else {
      setLoading(true);
      try {
        const getComprador = await CompradorFirebaseCrud.Read(
          fetchCpfComprador,
        );
        setDadosComprador(getComprador.data());
        setEditable(true);
        setSearched(true);
        setNotFinded(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setNotFinded(true);
      }
    }
  };

  function setDadosComprador(data) {
    setCompradorData(data);
    setShowTelefoneComprador(data.telefone);
    setShowNomeComprador(data.nome);
    setShowCepComprador(data.cep);
    setShowNumeroComprador(data.numero);
    setShowRuaComprador(data.rua);
    setShowBairroComprador(data.bairro);
    setShowMunicipioComprador(data.municipio);
    setShowEstadoComprador(data.estado);
    setShowEmailComprador(data.email);
  }

  const Update = async () => {
    const compradoresCollection = db.collection('compradores');
    try {
      const comprador = compradoresCollection.doc('' + fetchCpfComprador + '');
      const doc = await comprador.get(); //verifica se o CPF informado corresponde a um documento existente
      if (!doc.exists) {
        alert('CPF não existe na base de dados');
      } else {
        newNomeComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ nome: newNomeComprador }, { merge: true })
          : '';
        newTelefoneComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ telefone: newTelefoneComprador }, { merge: true })
          : '';
        newCepComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ cep: newCepComprador }, { merge: true })
          : '';
        newNumeroComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ numero: newNumeroComprador }, { merge: true })
          : '';
        newRuaComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ rua: newRuaComprador }, { merge: true })
          : '';
        newBairroComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ bairro: newBairroComprador }, { merge: true })
          : '';
        newMunicipioComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ municipio: newMunicipioComprador }, { merge: true })
          : '';
        newEstadoComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ estado: newEstadoComprador }, { merge: true })
          : '';
        newEmailComprador
          ? await compradoresCollection
              .doc('' + fetchCpfComprador + '')
              .set({ email: newEmailComprador }, { merge: true })
          : '';
        alert('Dados Editados com sucesso');
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  };

  const Delete = async () => {
    try {
      CompradorFirebaseCrud.Delete(compradorData, () => {
        setFetchCpfComprador('');
        setShowTelefoneComprador('');
        setShowNomeComprador('');
        setShowCepComprador('');
        setShowNumeroComprador('');
        setShowRuaComprador('');
        setShowBairroComprador('');
        setShowMunicipioComprador('');
        setShowEstadoComprador('');
        setShowEmailComprador('');
        setEditable(false);
        alert('Comprador Excluido');
        navigation.goBack();
      });
    } catch (error) {
      alert(error.message);
    }
  };

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
        placeholder="Digite o CPF do Comprador"
        value={fetchCpfComprador}
        onChangeText={(value) => setFetchCpfComprador(value)}
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
      <Text style={css.label}>Nome do Comprador:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showNomeComprador}
        value={newNomeComprador}
        onChangeText={(text) => setNewNomeComprador(text)}
      />
      <Text style={css.label}>Telefone:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showTelefoneComprador}
        value={newTelefoneComprador}
        onChangeText={(text) => setNewTelefoneComprador(text)}
      />

      <Text style={css.label}>CEP:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showCepComprador}
        value={newCepComprador}
        onChangeText={(text) => setNewCepComprador(text)}
      />

      <Text style={css.label}>Número da Residência:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showNumeroComprador}
        value={newNumeroComprador}
        onChangeText={(text) => setNewNumeroComprador(text)}
      />

      <Text style={css.label}>Rua:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showRuaComprador}
        value={newRuaComprador}
        onChangeText={(text) => setNewRuaComprador(text)}
      />

      <Text style={css.label}>Bairro:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showBairroComprador}
        value={newBairroComprador}
        onChangeText={(text) => setNewBairroComprador(text)}
      />

      <Text style={css.label}>Município:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showMunicipioComprador}
        value={newMunicipioComprador}
        onChangeText={(text) => setNewMunicipioComprador(text)}
      />

      <Text style={css.label}>Estado:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showEstadoComprador}
        value={newEstadoComprador}
        onChangeText={(text) => setNewEstadoComprador(text)}
      />

      <Text style={css.label}>E-Mail:</Text>
      <TextInput
        style={css.input}
        editable={editable}
        multiline={false}
        defaultValue={showEmailComprador}
        value={newEmailComprador}
        onChangeText={(text) => setNewEmailComprador(text)}
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
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            Excluir Comprador
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  async function confirmRemove() {
    Alert.alert('Excluir dado', 'Deseja excluir esse comprador?', [
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

  return (
    <ScrollView style={searched === false ? { flex: 1 } : {}}>
      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        {elementSearch()}
        {notFinded && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Nenhum dado encontrado com esse CPF...
            </Text>
          </View>
        )}
        {loading && <ActivityIndicator size="large"></ActivityIndicator>}
        {searched && elementForm()}
      </Animatable.View>
    </ScrollView>
  );
};

export default ConsultarComprador;
