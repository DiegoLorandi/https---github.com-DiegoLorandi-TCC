import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { db } from '../../../firebase';
import getRealm from '../../services/realm';

const AtualizarPeso = ({ navigation }) => {
  const [fetchIdAnimal, setFetchIdAnimal] = useState('');

  async function cadastrarRealm() {
    console.log('cadastrar()');
    try {
      const data = {
        idAnimal: 25,
        dataNascimento: '10/09/2020',
        racaAnimal: 'teste',
        sexoAnimal: 'teste',
        statusAnimal: 'teste',
      };
      const realm = await getRealm();
      realm.write(() => {
        realm.create('Animais', data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function consultarRealm() {
    const realm = await getRealm();
    const animais = realm.objects('Animais');
    console.log(animais);
  }

  const [newPesoAnimal, setNewPesoAnimal] = useState(null);

  const Update = async () => {
    const animaisCollection = db.collection('animais');
    if (newPesoAnimal) {
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
            });
          });
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
        alert('Peso Atualizado com sucesso');
        setFetchIdAnimal('');
        setNewPesoAnimal('');
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Preencha o campo com o novo peso do animal');
    }
  };
  return (
    <View>
      <Text>Id do Animal:</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Digite o Id do animal"
        value={fetchIdAnimal}
        onChangeText={(value) => setFetchIdAnimal(value)}
      />
      <Text>Novo Peso:</Text>
      <TextInput
        multiline={false}
        value={newPesoAnimal}
        onChangeText={(text) => setNewPesoAnimal(text)}
      />
      <TouchableOpacity onPress={Update}>
        <Text>Atualizar Peso</Text>
      </TouchableOpacity>

      <Button title="Cadastrar no realm" onPress={cadastrarRealm} />
      <Button title="Consultar no realm" onPress={consultarRealm} />
    </View>
  );
};
export default AtualizarPeso;
