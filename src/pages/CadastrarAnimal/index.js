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
import NetInfoHelper from '../../helpers/NetInfoHelper';
import getRealm from '../../services/realm';

const CadastrarAnimal = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  const [newIdAnimal, setNewIdAnimal] = useState('');
  const [newPesoAnimal, setNewPesoAnimal] = useState();
  const [newDataAnimal, setNewDataAnimal] = useState('');
  const [newRacaAnimal, setNewRacaAnimal] = useState('');
  const [newSexoAnimal, setNewSexoAnimal] = useState('Macho');
  const [newStatusAnimal, setNewStatusAnimal] = useState('');

  const Create = async () => {
    const data = {
      pesoId: 1,
      idAnimal: newIdAnimal,
      dataNascimento: newDataAnimal,
      sexoAnimal: newSexoAnimal,
      racaAnimal: newRacaAnimal,
      statusAnimal: newStatusAnimal,
    };

    if (NetInfoHelper.isConnected()) {
      // Salva no firebase
      if (
        newIdAnimal == '' ||
        newPesoAnimal == '' ||
        newDataAnimal == '' ||
        newRacaAnimal == '' ||
        newSexoAnimal == '' ||
        newStatusAnimal == ''
      ) {
        alert('Preencha todos os dados corretamente');
      } else {
        const animaisCollection = db.collection('animais');
        try {
          var docId = '';
          await animaisCollection.add(data).then((data) => {
            docId = data.id;
          });
          db.collection('animais')
            .doc(docId)
            .collection('pesoAnimal')
            .doc('1')
            .set({
              idAnimal: newIdAnimal,
              pesoAnimal: newPesoAnimal,
              data: new Date(),
            });
          alert('Animal cadastrado');
          navigation.navigate('Gerenciar Animais', newIdAnimal);
        } catch (error) {
          alert(error.message);
        }
      }
    } else {
      // Salva no realm
      alert('Animal cadastrado');
      const realm = await getRealm();
      realm.write(() => {
        realm.create('Animais', {
          ...data,
          peso: newPesoAnimal,
          tipoDado: 'cadastro',
        });
      });
      realm.close();
      navigation.navigate('Gerenciar Animais', newIdAnimal);
    }
  };

  return (
    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Animatable.View animation="fadeInUp" delay={500}></Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        style={{
          marginTop: 10,
          backgroundColor: '#ffffff',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      >
        <Text style={css.label}>Id</Text>
        <TextInput
          style={css.input}
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
          onChangeText={(value) => setNewPesoAnimal(value)}
        />
        <Text style={css.label}>Raça</Text>
        <TextInput
          style={css.input}
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
          placeholder="Selecione o status do animal"
          onChangeText={(value) => setNewStatusAnimal(value)}
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
              Cadastrar Animal
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};
export default CadastrarAnimal;
