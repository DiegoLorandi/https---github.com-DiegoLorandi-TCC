import { db } from '../../../firebase';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import Radio from '../../components/Ratio';
import { css } from './Css';
import * as Animatable from 'react-native-animatable';

const AtualizarComprador = (props) => {
  const navigation = props.navigation;
  var animal = props.route.params;
  const [selected, setSelected] = useState(0);
  const [newIdAnimal, setNewIdAnimal] = useState('');
  const [newPesoAnimal, setNewPesoAnimal] = useState();
  const [newDataAnimal, setNewDataAnimal] = useState('');
  const [newRacaAnimal, setNewRacaAnimal] = useState('');
  const [newSexoAnimal, setNewSexoAnimal] = useState('Macho');
  const [newStatusAnimal, setNewStatusAnimal] = useState('');
  const [currentPesoId, setcurrentPesoId] = useState(0);

  useEffect(() => {
    setNewIdAnimal(animal.idAnimal);
    setNewPesoAnimal(animal.pesoId);
    setNewSexoAnimal(animal.sexoAnimalBuscado);
    setNewStatusAnimal(animal.statusAnimalBuscado);
    setNewDataAnimal(animal.dataAnimalBuscado);
    setNewRacaAnimal(animal.racaAnimalBuscado);
    setcurrentPesoId(animal.pesoId);
    (async function () {
      const animaisCollection = db.collection('animais');
      var getPesoAnimal = await animaisCollection
        .doc(animal.id)
        .collection('pesoAnimal')
        .doc('' + animal.pesoId + '')
        .get();
      setNewPesoAnimal(getPesoAnimal.data().pesoAnimal);
      animal.pesoAnimal = getPesoAnimal.data().pesoAnimal;
    })();
  }, [props.route]);

  const Update = async () => {
    const animaisCollection = db.collection('animais');
    try {
      var docId = '';
      var pesoId;
      await animaisCollection
        .where('idAnimal', '==', '' + animal.idAnimal + '')
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
      if (newPesoAnimal != animal.pesoAnimal && newPesoAnimal != null) {
        var newPesoId = pesoId + 1; //soma 1 na variável pesoId
        setcurrentPesoId(newPesoId);
        await animaisCollection
          .doc(docId)
          .set({ pesoId: newPesoId }, { merge: true }); //atualiza o pesoId do documento do animal
        await db
          .collection('animais')
          .doc(docId)
          .collection('pesoAnimal')
          .doc('' + newPesoId + '')
          .set({
            idAnimal: newIdAnimal,
            pesoAnimal: newPesoAnimal,
            data: new Date(),
          });
      }
      alert('Dados Atualizados com sucesso!');
      navigation.navigate('Gerenciar Animais', animal);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Animatable.View animation="fadeInUp" delay={500}>
        {/* <Text>Cadastro de Animais</Text> */}
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Text style={css.label}>Id</Text>
        <TextInput
          style={css.input}
          value={newIdAnimal}
          placeholder="Digite o Id do animal"
          onChangeText={(value) => setNewIdAnimal(value)}
        />
        <Text style={css.label}>Data de Nascimento</Text>
        <MaskInput
          value={newDataAnimal}
          onChangeText={(masked, unmasked) => {
            setNewDataAnimal(masked);
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />

        <Text style={css.label}>Peso</Text>
        <TextInput
          style={css.input}
          keyboardType="numeric"
          placeholder="Kg:000.00"
          value={newPesoAnimal}
          onChangeText={(value) => setNewPesoAnimal(value)}
        />
        <Text style={css.label}>Raça</Text>
        <TextInput
          style={css.input}
          value={newRacaAnimal}
          placeholder="Digite a raça do animal"
          onChangeText={(value) => setNewRacaAnimal(value)}
        />
        <Text style={css.label}>Sexo</Text>
        <Radio
          selected={selected}
          options={['Macho', 'Fêmea']}
          horizontal={true}
          onChangeSelect={(options, index) => {
            setNewSexoAnimal(options);
            setSelected(index);
          }}
        />

        <Text style={css.label}>Status</Text>
        <TextInput
          style={css.input}
          value={newStatusAnimal}
          placeholder="Selecione o status do animal"
          onChangeText={(value) => setNewStatusAnimal(value)}
        />

        <View>
          <TouchableOpacity onPress={Update} style={css.button}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                padding: 5,
                textTransform: 'uppercase',
              }}
            >
              Atualizar Animal
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};
export default AtualizarComprador;
