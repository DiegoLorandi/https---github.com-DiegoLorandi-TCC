import { db } from '../../../firebase'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaskInput from 'react-native-mask-input';
import { css } from './Css'
import * as Animatable from 'react-native-animatable'


const CadastrarComprador = ({ navigation }) => {
  const [newCpfComprador, setNewCpfComprador] = useState("");
  const [newTelefoneComprador, setNewTelefoneComprador] = useState();
  const [newNomeComprador, setNewNomeComprador] = useState("");

  const [newCepComprador, setNewCepComprador] = useState("");
  const [newNumeroComprador, setNewNumeroComprador] = useState("");
  const [newRuaComprador, setNewRuaComprador] = useState("");
  const [newBairroComprador, setNewBairroComprador] = useState("");
  const [newMunicipioComprador, setNewMunicipioComprador] = useState("");
  const [newEstadoComprador, setNewEstadoComprador] = useState("");

  const [newEmailComprador, setNewEmailComprador] = useState("");


  const Create = async () => {
    const compradoresCollection = db.collection('compradores');
    if (newCpfComprador == "" || newTelefoneComprador == "" || newNomeComprador == "" || newCepComprador == "" || newNumeroComprador == "" || newRuaComprador == "" || newBairroComprador == "" || newMunicipioComprador == "" || newEstadoComprador == ""|| newEmailComprador == "") {
      alert("Preencha todos os dados corretamente")
    } else {
      try {
        await compradoresCollection.doc(newCpfComprador).set({
          nome: newNomeComprador,
          telefone: newTelefoneComprador,
          cep: newCepComprador,
          numero: newNumeroComprador,
          rua: newRuaComprador,
          bairro: newBairroComprador,
          municipio: newMunicipioComprador,
          estado: newEstadoComprador,
          email: newEmailComprador,
        })
        setNewCpfComprador("")
        setNewNomeComprador("")
        setNewTelefoneComprador("")
        setNewCepComprador("")
        setNewNumeroComprador("")
        setNewRuaComprador("")
        setNewBairroComprador("")
        setNewMunicipioComprador("")
        setNewEstadoComprador("")
        setNewEmailComprador("")
        alert("Comprador cadastrado com sucesso")
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <View >
      <Animatable.View animation="fadeInUp" delay={500}>
        <Text>Cadastro Comprador</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text >CPF do Comprador:</Text>
        <TextInput style={css.input}
          value={newCpfComprador}
          placeholder='CPF do Comprador'
          onChangeText={value => setNewCpfComprador(value)}
        />

        <Text >Telefone:</Text>
        <MaskInput
          value={newTelefoneComprador}
          onChangeText={(masked, unmasked) => {
            setNewTelefoneComprador(masked);
          }}
          mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />



        <Text >Nome:</Text>
        <TextInput style={css.input}
          value={newNomeComprador}
          placeholder='Nome do Comprador'
          onChangeText={value => setNewNomeComprador(value)}
        />

        <Text >CEP:</Text>
        <MaskInput
          value={newCepComprador}
          onChangeText={(masked, unmasked) => {
            setNewCepComprador(masked);
          }}
          mask={[ /\d/, /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/ ]}
        />

        <Text >Número:</Text>
        <TextInput style={css.input}
          value={newNumeroComprador}
          keyboardType='numeric'
          placeholder='Número da residência'
          onChangeText={value => setNewNumeroComprador(value)}
        />

        <Text >Rua:</Text>
        <TextInput style={css.input}
          value={newRuaComprador}
          placeholder='Nome da Rua'
          onChangeText={value => setNewRuaComprador(value)}
        />

        <Text >Bairro:</Text>
        <TextInput style={css.input}
        value={newBairroComprador}
          placeholder='Nome do Bairro'
          onChangeText={value => setNewBairroComprador(value)}
        />

        <Text >Município:</Text>
        <TextInput style={css.input}
        value={newMunicipioComprador}
          placeholder='Nome do Município'
          onChangeText={value => setNewMunicipioComprador(value)}
        />

        <Text >Estado:</Text>
        <TextInput style={css.input}
          value={newEstadoComprador}
          placeholder='Unidades federativa:'
          onChangeText={value => setNewEstadoComprador(value)}
        />

        <Text >E-Mail:</Text>
        <TextInput style={css.input}
          value={newEmailComprador}
          placeholder='Endereço de E-mail'
          onChangeText={value => setNewEmailComprador(value)}
        />

        <View >
          <TouchableOpacity
            onPress={Create}>
            <Text>Cadastrar Comprador</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

    </View>
  );
}
export default CadastrarComprador