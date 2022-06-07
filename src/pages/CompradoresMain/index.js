import { View, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import Radio from '../../components/Ratio'
import { css } from './Css'
import * as Animatable from 'react-native-animatable'



export default function CompradoresMain() {
  const [selected, setSelected] = useState(0);
  var state = {raca:''};
  return (
    <View style={css.container}>
      <Animatable.View animation="fadeInUp" delay={500}>
        <Text>Cadastro de Animais</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text >Id</Text>
        <TextInput style={css.input}
          placeholder='Digite o Id do animal'
        />
        <Text >Data de Nascimento</Text>
        <TextInput style={css.input}
          keyboardType='numeric'
          placeholder='00/00/0000'
        />
        <Text >Peso</Text>
        <TextInput style={css.input}
          keyboardType='numeric'
          placeholder='Kg:00,00'
        />
        <Text >Raça</Text>
        <Picker>
          <Picker.Item label="Selecione a raça" value="disabled" color='#aaa' />
          <Picker.Item label="Nelore" value="Nelore" />
          <Picker.Item label="Gir" value="Gir" />
          <Picker.Item label="Guzerá" value="Guzerá" />
        </Picker>
        <Text>Sexo</Text>
        <Radio
          selected={selected}
          options={['Macho', 'Fêmea']}
          horizontal={true}
          onChangeSelect={(opt, index) => {
            setSelected(index);
          }
          }
        />

        <Text >Status</Text>
        <TextInput style={css.input}
          placeholder='Digite o status do animal'
        />

        <View >
          <TouchableOpacity >
            <Text >Cadastrar Animal</Text>
          </TouchableOpacity>

          <TouchableHighlight >
            <Text >Cancelar</Text>
          </TouchableHighlight>
        </View>
      </Animatable.View>

    </View>
  );
}