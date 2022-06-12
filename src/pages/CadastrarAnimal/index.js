import { db } from '../../../firebase'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaskInput from 'react-native-mask-input';
import Radio from '../../components/Ratio'
import { css } from './Css'
import * as Animatable from 'react-native-animatable'


const CadastrarAnimal = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  const [newIdAnimal, setNewIdAnimal] = useState("");
  const [newPesoAnimal, setNewPesoAnimal] = useState();
  const [newDataAnimal, setNewDataAnimal] = useState("");
  const [newRacaAnimal, setNewRacaAnimal] = useState("");
  const [newSexoAnimal, setNewSexoAnimal] = useState("Macho");
  const [newStatusAnimal, setNewStatusAnimal] = useState("");


  const Create = async () => {
    const animaisCollection = db.collection('animais');
    if (newIdAnimal == "" || newPesoAnimal == "" || newDataAnimal == "" || newRacaAnimal == "" || newSexoAnimal == "" || newStatusAnimal == "") {
      alert("Preencha todos os dados corretamente")
    } else {
      try {
        var docId = ""
        await animaisCollection.add({
          pesoId: 1,
          idAnimal: newIdAnimal,
          dataNascimento: newDataAnimal,
          sexoAnimal: newSexoAnimal,
          racaAnimal: newRacaAnimal,
          statusAnimal: newStatusAnimal,
        }).then((data) => {
          docId = data.id
        })
        db.collection("animais").doc(docId).collection("pesoAnimal").doc("1").set({
          idAnimal: newIdAnimal,
          pesoAnimal: newPesoAnimal,
          data: new Date()
        })
        alert("Animal cadastrado")
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <View style={css.container}>
      <Animatable.View animation="fadeInUp" delay={500}>
        <Text>Cadastro de Animais</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text >Id</Text>
        <TextInput style={css.input}
          placeholder='Digite o Id do animal'
          onChangeText={value => setNewIdAnimal(value)}
        />
        <Text >Data de Nascimento</Text>
        <MaskInput
          value={newDataAnimal}
          onChangeText={(masked, unmasked) => {
            setNewDataAnimal(masked);
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />



        <Text >Peso</Text>
        <TextInput style={css.input}
          keyboardType='numeric'
          placeholder='Kg:000.00'
          onChangeText={value => setNewPesoAnimal(value)}
        />
        <Text >Raça</Text>
        <TextInput style={css.input}
          placeholder='Digite a raça do animal'
          onChangeText={value => setNewRacaAnimal(value)}
        />
        <Text>Sexo</Text>
        <Radio
          selected={selected}
          options={['Macho', 'Fêmea']}
          horizontal={true}
          onChangeSelect={(options, index) => {
            setNewSexoAnimal(options)
            setSelected(index);
          }
          }
        />

        <Text >Status</Text>
        <TextInput style={css.input}
          placeholder='Selecione o status do animal'
          onChangeText={value => setNewStatusAnimal(value)}
        />

        <View >
          <TouchableOpacity
            onPress={Create}>
            <Text>Cadastrar Animal</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

    </View>
  );
}
export default CadastrarAnimal