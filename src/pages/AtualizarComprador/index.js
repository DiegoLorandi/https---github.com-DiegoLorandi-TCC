import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { css } from './Css';
import { db } from '../../services/firebase';
import NetInfoHelper from '../../helpers/NetInfoHelper';

const AtualizarComprador = ({ navigation, route }) => {
  var compradorDados = route.params;
  console.log(compradorDados);
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

  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setFetchCpfComprador(compradorDados.cpf);
    setShowTelefoneComprador(compradorDados.telefone);
    setShowNomeComprador(compradorDados.nome);
    setShowCepComprador(compradorDados.cep);
    setShowNumeroComprador(compradorDados.numero);
    setShowRuaComprador(compradorDados.rua);
    setShowBairroComprador(compradorDados.bairro);
    setShowMunicipioComprador(compradorDados.municipio);
    setShowEstadoComprador(compradorDados.estado);
    setShowEmailComprador(compradorDados.email);
    setEditable(true);
  }, [route]);

  const Update = async () => {
    if (NetInfoHelper.isConnected() == false) {
      alert('?? necess??rio estar conectado para executar essa a????o!');
    }
    const compradoresCollection = db.collection('compradores');
    try {
      const teste = compradoresCollection.doc('' + fetchCpfComprador + '');
      const doc = await teste.get(); //verifica se o CPF informado corresponde a um documento existente
      if (!doc.exists) {
        alert('CPF n??o existe na base de dados');
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
        navigation.navigate('Gerenciar Comprador', compradorDados);
      }
    } catch (error) {
      alert(error);
    }
  };

  const Delete = async () => {
    if (NetInfoHelper.isConnected()) {
      alert('?? necess??rio estar conectado para executar essa a????o!');
    }

    try {
      const compradoresCollection = db.collection('compradores');
      await compradoresCollection.doc(fetchCpfComprador).delete();

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
    } catch (error) {
      alert(error.message);
    }
  };

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

      <Text style={css.label}>N??mero da Resid??ncia:</Text>
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

      <Text style={css.label}>Munic??pio:</Text>
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
    console.log('confirmRemove()');
    Alert.alert('Excluir dado', 'Deseja excluir esse comprador?', [
      {
        text: 'Sim',
        onPress() {
          Delete();
        },
      },
      {
        text: 'N??o',
      },
    ]);
  }

  return (
    <ScrollView style={searched === false ? { flex: 1 } : {}}>
      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        {elementForm()}
      </Animatable.View>
    </ScrollView>
  );
};

export default AtualizarComprador;
