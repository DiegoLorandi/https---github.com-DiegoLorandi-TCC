import { db } from '../../services/firebase';
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
import AnimalFirebaseCrud from '../../utils/AnimalFirebaseCrud';

const AtualizarAnimal = (props) => {
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
    getAnimal(animal);
  }, [props.route]);

  async function getAnimal(animal) {
    const animalData = await AnimalFirebaseCrud.Read(animal.idAnimal);
    setNewPesoAnimal(animalData.pesoAnimal);
    animal.pesoAnimal = animalData.pesoAnimal;
  }

  const Update = async () => {
    const novoPeso =
      newPesoAnimal != animal.pesoAnimal && newPesoAnimal != null;
    try {
      const docId = await AnimalFirebaseCrud.Update(
        animal.idAnimal,
        novoPeso ? newPesoAnimal : undefined,
      );
      alert('Dados Atualizados com sucesso!');
      navigation.navigate('Gerenciar Animais', { docId: docId });
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
export default AtualizarAnimal;
