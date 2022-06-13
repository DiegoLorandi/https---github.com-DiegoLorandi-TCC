import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { css } from './Css'
import { db } from '../../../firebase'


const ConsultarComprador = ({ navigation }) => {
  const [editable, setEditable] = useState(false);
  const [fetchCpfComprador, setFetchCpfComprador] = useState("");
  const [showTelefoneComprador, setShowTelefoneComprador] = useState("");
  const [showNomeComprador, setShowNomeComprador] = useState("");
  const [showCepComprador, setShowCepComprador] = useState("");
  const [showNumeroComprador, setShowNumeroComprador] = useState("");
  const [showRuaComprador, setShowRuaComprador] = useState("");
  const [showBairroComprador, setShowBairroComprador] = useState("");
  const [showMunicipioComprador, setShowMunicipioComprador] = useState("");
  const [showEstadoComprador, setShowEstadoComprador] = useState("");
  const [showEmailComprador, setShowEmailComprador] = useState("");


  const [newTelefoneComprador, setNewTelefoneComprador] = useState();
  const [newNomeComprador, setNewNomeComprador] = useState(null);
  const [newCepComprador, setNewCepComprador] = useState(null);
  const [newNumeroComprador, setNewNumeroComprador] = useState(null);
  const [newRuaComprador, setNewRuaComprador] = useState(null);
  const [newBairroComprador, setNewBairroComprador] = useState(null);
  const [newMunicipioComprador, setNewMunicipioComprador] = useState(null);
  const [newEstadoComprador, setNewEstadoComprador] = useState(null);
  const [newEmailComprador, setNewEmailComprador] = useState(null);

  const Read = async () => {
    try {
      const compradoresCollection = db.collection('compradores');
      var getCompradores = await compradoresCollection.doc(fetchCpfComprador).get()

      setShowTelefoneComprador(getCompradores.data().telefone)
      setShowNomeComprador(getCompradores.data().nome)
      setShowCepComprador(getCompradores.data().cep)
      setShowNumeroComprador(getCompradores.data().numero)
      setShowRuaComprador(getCompradores.data().rua)
      setShowBairroComprador(getCompradores.data().bairro)
      setShowMunicipioComprador(getCompradores.data().municipio)
      setShowEstadoComprador(getCompradores.data().estado)
      setShowEmailComprador(getCompradores.data().email)
      setEditable(true)
    } catch (error) {
      alert(error.message)
    }
  }
  const Update = async () => {
    const compradoresCollection = db.collection('compradores');
    try {
      const teste = compradoresCollection.doc('' + fetchCpfComprador + '');
      const doc = await teste.get();//verifica se o CPF informado corresponde a um documento existente
      if (!doc.exists) {
        alert("CPF não existe na base de dados")
      } else {
        newNomeComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ nome: newNomeComprador }, { merge: true }) : "";
        newTelefoneComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ telefone: newTelefoneComprador }, { merge: true }) : "";
        newCepComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ cep: newCepComprador }, { merge: true }) : "";
        newNumeroComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ numero: newNumeroComprador }, { merge: true }) : "";
        newRuaComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ rua: newRuaComprador }, { merge: true }) : "";
        newBairroComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ bairro: newBairroComprador }, { merge: true }) : "";
        newMunicipioComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ municipio: newMunicipioComprador }, { merge: true }) : "";
        newEstadoComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ estado: newEstadoComprador }, { merge: true }) : "";
        newEmailComprador ? await compradoresCollection.doc('' + fetchCpfComprador + '').set({ email: newEmailComprador }, { merge: true }) : "";
        alert("Dados Editados com sucesso")
      }
    } catch (error) {
      alert(error)
    }

  }

  const Delete = async () => {
    try {
      const compradoresCollection = db.collection('compradores');
      await compradoresCollection.doc(fetchCpfComprador).delete()

      setFetchCpfComprador("")
      setShowTelefoneComprador("")
      setShowNomeComprador("")
      setShowCepComprador("")
      setShowNumeroComprador("")
      setShowRuaComprador("")
      setShowBairroComprador("")
      setShowMunicipioComprador("")
      setShowEstadoComprador("")
      setShowEmailComprador("")
      setEditable(false)
      alert("Comprador Excluido")
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <View >
      <Text>Consultar Comprador</Text>
      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text >CPF do Comprador:</Text>
        <TextInput style={css.input}
          keyboardType='numeric'
          placeholder='Digite o CPF do Comprador'
          value={fetchCpfComprador}
          onChangeText={value => setFetchCpfComprador(value)}
        />
        <Text >Nome do Comprador:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showNomeComprador}
          value={newNomeComprador}
          onChangeText={text => setNewNomeComprador(text)}
        />
        <Text >Telefone:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showTelefoneComprador}
          value={newTelefoneComprador}
          onChangeText={text => setNewTelefoneComprador(text)}
        />

        <Text >CEP:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showCepComprador}
          value={newCepComprador}
          onChangeText={text => setNewCepComprador(text)}
        />

        <Text >Número da Residência:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showNumeroComprador}
          value={newNumeroComprador}
          onChangeText={text => setNewNumeroComprador(text)}
        />

        <Text >Rua:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showRuaComprador}
          value={newRuaComprador}
          onChangeText={text => setNewRuaComprador(text)}
        />

        <Text >Bairro:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showBairroComprador}
          value={newBairroComprador}
          onChangeText={text => setNewBairroComprador(text)}
        />

        <Text >Município:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showMunicipioComprador}
          value={newMunicipioComprador}
          onChangeText={text => setNewMunicipioComprador(text)}
        />

        <Text >Estado:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showEstadoComprador}
          value={newEstadoComprador}
          onChangeText={text => setNewEstadoComprador(text)}
        />

        <Text >E-Mail:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showEmailComprador}
          value={newEmailComprador}
          onChangeText={text => setNewEmailComprador(text)}
        />

        <View >
          <TouchableOpacity
            onPress={Read}>
            <Text>Buscar Comprador</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={Update}>
            <Text>Editar dados</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={Delete}>
            <Text>Excluir Comprador</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default ConsultarComprador
