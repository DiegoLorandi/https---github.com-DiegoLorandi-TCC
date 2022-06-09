import { View, Button, Text, TextInput, TouchableHighlight } from 'react-native'
import * as React from 'react';
import { css } from './Css'
import * as Animatable from 'react-native-animatable'

const Login = ({ navigation }) => {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    underlayColor: '#E8F1F2',
    style: isPress ? css.btnRegisterPress : css.btnRegister,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log(''),
  };
  return (
    <View style={css.blocoLogin}>
      <Animatable.View animation="fadeInLeft" delay={500} style={css.header}>
        <Text style={css.bemVindo}>Seja Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text style={css.title}>Email</Text>
        <TextInput style={css.input}
          placeholder='Digite seu e-mail'
        />
        <Text style={css.title}>Senha</Text>
        <TextInput style={css.input}
          placeholder='Digite sua senha'
        />
        <View style={css.btnContainer}>
          <Button
            title="Ir para Home"
            onPress={() =>
              navigation.navigate('Home')
            }
          />

          <TouchableHighlight {...touchProps}>
            <Text style={css.btnTextRegister}>Cadastrar-se</Text>
          </TouchableHighlight>
        </View>
      </Animatable.View>

    </View>

  );
};
export default Login