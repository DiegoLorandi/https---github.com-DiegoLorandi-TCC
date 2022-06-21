import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import { css } from './Css';
import * as Animatable from 'react-native-animatable';
import NetInfoHelper from '../../helpers/NetInfoHelper';
import CompradorFirebaseCrud from '../../utils/CompradorFirebaseCrud';
import CompradorRealmCrud from '../../utils/CompradorRealmCrud';

const CadastrarComprador = ({ navigation }) => {
  const [newCpfComprador, setNewCpfComprador] = useState('');
  const [newTelefoneComprador, setNewTelefoneComprador] = useState();
  const [newNomeComprador, setNewNomeComprador] = useState('');

  const [newCepComprador, setNewCepComprador] = useState('');
  const [newNumeroComprador, setNewNumeroComprador] = useState('');
  const [newRuaComprador, setNewRuaComprador] = useState('');
  const [newBairroComprador, setNewBairroComprador] = useState('');
  const [newMunicipioComprador, setNewMunicipioComprador] = useState('');
  const [newEstadoComprador, setNewEstadoComprador] = useState('');

  const [newEmailComprador, setNewEmailComprador] = useState('');

  function Create() {
    const data = {
      nome: newNomeComprador,
      telefone: newTelefoneComprador,
      cep: newCepComprador,
      numero: newNumeroComprador,
      rua: newRuaComprador,
      bairro: newBairroComprador,
      municipio: newMunicipioComprador,
      estado: newEstadoComprador,
      email: newEmailComprador,
      cpf: newCpfComprador,
    };
    // Cadastra no firebase
    if (NetInfoHelper.isConnected()) {
      console.log('chamado!');
      CompradorFirebaseCrud.Create(data)
        .then(() => {
          setNewCpfComprador('');
          setNewNomeComprador('');
          setNewTelefoneComprador('');
          setNewCepComprador('');
          setNewNumeroComprador('');
          setNewRuaComprador('');
          setNewBairroComprador('');
          setNewMunicipioComprador('');
          setNewEstadoComprador('');
          setNewEmailComprador('');
          alert('Comprador cadastrado com sucesso');
        })
        .catch((error) => {
          if (error != false) {
            alert(error);
          } else {
            alert('Falha ao cadastrar comprador.');
          }
        });
    } else {
      // Cadastra no realmDB
      CompradorRealmCrud.Create({ ...data })
        .then(() => {
          setNewCpfComprador('');
          setNewNomeComprador('');
          setNewTelefoneComprador('');
          setNewCepComprador('');
          setNewNumeroComprador('');
          setNewRuaComprador('');
          setNewBairroComprador('');
          setNewMunicipioComprador('');
          setNewEstadoComprador('');
          setNewEmailComprador('');
          alert('Comprador cadastrado com sucesso');
        })
        .catch((error) => {
          if (error != false) {
            alert(error);
          } else {
            alert('Falha ao cadastrar comprador');
          }
        });
    }
  }

  return (
    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Animatable.View
        animation="fadeInUp"
        style={{
          backgroundColor: '#ffffff',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text style={css.label}>CPF do Comprador:</Text>
        <TextInput
          style={css.input}
          value={newCpfComprador}
          placeholder="CPF do Comprador"
          onChangeText={(value) => setNewCpfComprador(value)}
        />

        <Text style={css.label}>Telefone:</Text>
        <MaskInput
          style={css.maskInput}
          value={newTelefoneComprador}
          onChangeText={(masked, unmasked) => {
            setNewTelefoneComprador(masked);
          }}
          mask={[
            '(',
            /\d/,
            /\d/,
            ')',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />

        <Text style={css.label}>Nome:</Text>
        <TextInput
          style={css.input}
          value={newNomeComprador}
          placeholder="Nome do Comprador"
          onChangeText={(value) => setNewNomeComprador(value)}
        />

        <Text style={css.label}>CEP:</Text>
        <MaskInput
          style={css.maskInput}
          value={newCepComprador}
          onChangeText={(masked, unmasked) => {
            setNewCepComprador(masked);
          }}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
        />

        <Text style={css.label}>Número:</Text>
        <TextInput
          style={css.input}
          value={newNumeroComprador}
          keyboardType="numeric"
          placeholder="Número da residência"
          onChangeText={(value) => setNewNumeroComprador(value)}
        />

        <Text style={css.label}>Rua:</Text>
        <TextInput
          style={css.input}
          value={newRuaComprador}
          placeholder="Nome da Rua"
          onChangeText={(value) => setNewRuaComprador(value)}
        />

        <Text style={css.label}>Bairro:</Text>
        <TextInput
          style={css.input}
          value={newBairroComprador}
          placeholder="Nome do Bairro"
          onChangeText={(value) => setNewBairroComprador(value)}
        />

        <Text style={css.label}>Município:</Text>
        <TextInput
          style={css.input}
          value={newMunicipioComprador}
          placeholder="Nome do Município"
          onChangeText={(value) => setNewMunicipioComprador(value)}
        />

        <Text style={css.label}>Estado:</Text>
        <TextInput
          style={css.input}
          value={newEstadoComprador}
          placeholder="Unidades federativa:"
          onChangeText={(value) => setNewEstadoComprador(value)}
        />

        <Text style={css.label}>E-Mail:</Text>
        <TextInput
          style={css.input}
          value={newEmailComprador}
          placeholder="Endereço de E-mail"
          onChangeText={(value) => setNewEmailComprador(value)}
        />

        <View>
          <TouchableOpacity onPress={Create} style={css.button}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                padding: 5,
                textTransform: 'uppercase',
              }}
            >
              Cadastrar Comprador
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};
export default CadastrarComprador;
