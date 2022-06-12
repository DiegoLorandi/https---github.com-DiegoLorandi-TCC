import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { css } from './Css'
import { db } from '../../../firebase'


const ConsultarAnimal = ({ navigation }) => {
  const [editable, setEditable] = useState(false);
  const [fetchIdAnimal, setFetchIdAnimal] = useState("");
  const [showDataAnimal, setShowDataAnimal] = useState("");
  const [showPesoAnimal, setShowPesoAnimal] = useState("");
  const [showSexoAnimal, setShowSexoAnimal] = useState("");
  const [showRacaAnimal, setShowRacaAnimal] = useState("");
  const [showStatusAnimal, setShowStatusAnimal] = useState("");


  const [newDataAnimal, setNewDataAnimal] = useState(null);
  const [newPesoAnimal, setNewPesoAnimal] = useState(null);
  const [newSexoAnimal, setNewSexoAnimal] = useState(null);
  const [newRacaAnimal, setNewRacaAnimal] = useState(null);
  const [newStatusAnimal, setNewStatusAnimal] = useState(null);


  const Read = async () => {
    const animaisCollection = db.collection('animais');
    try {
      var getAnimais = await animaisCollection.where('idAnimal', '==', '' + fetchIdAnimal + '').get()
      var dataAnimalBuscado
      var pesoAnimalBuscado
      var sexoAnimalBuscado
      var racaAnimalBuscado
      var statusAnimalBuscado
      var docId = ""
      var pesoId
      getAnimais.forEach(doc => {
        docId = doc.id
        pesoId = doc.data().pesoId
        dataAnimalBuscado = doc.data().dataNascimento;
        sexoAnimalBuscado = doc.data().sexoAnimal;
        racaAnimalBuscado = doc.data().racaAnimal;
        statusAnimalBuscado = doc.data().statusAnimal;
      });
      var getPesoAnimal = await animaisCollection.doc(docId).collection('pesoAnimal').doc(''+pesoId+'').get()
      pesoAnimalBuscado = getPesoAnimal.data().pesoAnimal

      setShowDataAnimal(dataAnimalBuscado)
      setShowPesoAnimal(pesoAnimalBuscado)
      setShowSexoAnimal(sexoAnimalBuscado)
      setShowRacaAnimal(racaAnimalBuscado)
      setShowStatusAnimal(statusAnimalBuscado)
      setEditable(true)
    } catch (error) {
      alert(error.message)
    }
  }
  const Update = async () => {
      const animaisCollection = db.collection('animais');
      try {
        var docId = ""
        var pesoId
        await animaisCollection.where('idAnimal', '==', '' + fetchIdAnimal + '').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              docId = doc.id
              pesoId = doc.data().pesoId//recebe o pesoId que está no documento
              newDataAnimal ? doc.ref.update({dataNascimento: newDataAnimal}) : "";
              newRacaAnimal ? doc.ref.update({racaAnimal: newRacaAnimal}) : "";
              newSexoAnimal ? doc.ref.update({sexoAnimal: newSexoAnimal}) : "";
              newStatusAnimal ? doc.ref.update({statusAnimal: newStatusAnimal}) : "";
          })
        })
        if(newPesoAnimal != showPesoAnimal && newPesoAnimal != null){
          var newPesoId = pesoId + 1;//soma 1 na variável pesoId
          await animaisCollection.doc(docId).set({ pesoId: newPesoId }, { merge: true });//atualiza o pesoId do documento do animal
          await db.collection("animais").doc(docId).collection("pesoAnimal").doc(''+newPesoId+'').set({
            idAnimal: fetchIdAnimal,
            pesoAnimal: newPesoAnimal,
            data: new Date()
          })
        }
        alert("Dados Editados com sucesso")
      } catch (error) {
        alert(error)
      }
  }
  const Delete = async () => {
    try {
      const animaisCollection = db.collection('animais');
      const getAnimais =  animaisCollection.where('idAnimal', '==', '' + fetchIdAnimal + '');
      await getAnimais.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
      setFetchIdAnimal("")
      setShowDataAnimal("")
      setShowPesoAnimal("")
      setShowSexoAnimal("")
      setShowRacaAnimal("")
      setShowStatusAnimal("")
      setEditable(false)
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <View >
      <Text>Consultar Animais</Text>
      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text >Id do Animal:</Text>
        <TextInput style={css.input}
          keyboardType='numeric'
          placeholder='Digite o Id do animal'
          value={fetchIdAnimal}
          onChangeText={value => setFetchIdAnimal(value)}
        />
        <Text >Data de Nascimento:</Text>
        <TextInput
          editable={editable}
          multiline={false}
          defaultValue={showDataAnimal}
          value={newDataAnimal} 
          onChangeText={text => setNewDataAnimal(text)}
        />
        <Text >Peso:</Text>
        <TextInput
         editable={editable}
          multiline={false}
          defaultValue={showPesoAnimal}
          value={newPesoAnimal} 
          onChangeText={text => setNewPesoAnimal(text)}
          />
        
        <Text >Sexo do Animal:</Text>
        <TextInput
         editable={editable}
          multiline={false}
          defaultValue={showSexoAnimal}
          value={newSexoAnimal} 
          onChangeText={text => setNewSexoAnimal(text)}
          />
        
        <Text >Raca:</Text>
        <TextInput
         editable={editable}
          multiline={false}
          defaultValue={showRacaAnimal}
          value={newRacaAnimal} 
          onChangeText={text => setNewRacaAnimal(text)}
          />
        
        <Text >Status:</Text>
        <TextInput
         editable={editable}
          multiline={false}
          defaultValue={showStatusAnimal}
          value={newStatusAnimal} 
          onChangeText={text => setNewStatusAnimal(text)}
          />
        
        <View >
          <TouchableOpacity
            onPress={Read}>
            <Text>Buscar Animal</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={Update}>
            <Text>Editar dados</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={Delete}>
            <Text>Excluir Animal</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default ConsultarAnimal