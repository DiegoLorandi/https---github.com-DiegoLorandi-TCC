import {
  View,
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import * as React from 'react';
import { css } from './Css';
import * as Animatable from 'react-native-animatable';
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import getRealm from '../../services/realm';

const Login = ({ navigation }) => {
  var [isPress, setIsPress] = React.useState(false);
  var [isPassword, setIsPassword] = React.useState(true); //controla o input da senha sendo secreta
  const [logged, setLogged] = React.useState(false);

  var touchProps = {
    underlayColor: '#E8F1F2',
    style: isPress ? css.btnRegisterPress : css.btnRegister,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log(''),
  };

  var [email, setEmail] = React.useState('');
  var [password, setPassword] = React.useState(''); // variável para receber email e senha

  React.useEffect(() => {
    if (logged === true) {
      navigation.navigate('Home');
      return;
    }
    registerStateChange();
    verifyLogin();
  }, [logged]);

  function registerStateChange() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(uid);
        setLogged(true);
      } else {
      }
    });
  }

  const handleSignUp = () => {
    //cadastrar usuário
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        registerLoginRealm(user.uid);
        Alert.alert('Usuário Cadastrado');
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    // Login
    navigation.navigate('Home');
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     registerLoginRealm(user.uid);
    //   })
    //   .catch((error) => alert(error.message));
  };

  async function registerLoginRealm(uid) {
    const realm = await getRealm();
    const usuario = realm.objects('Usuario');
    // Salva no realmdb
    if (usuario.length === 0) {
      const data = {
        userId: `${uid}`,
      };
      // realm.write(() => {
      //   realm.create('Usuario', data);
      // });
      // realm.close();
    }
  }

  // Verifica se já logou
  async function verifyLogin() {
    const realm = await getRealm();
    const usuario = realm.objects('Usuario');
    console.log(usuario);
    if (usuario.length != 0) {
      setLogged(true);
    }
  }

  return (
    <View style={css.blocoLogin}>
      <Animatable.View animation="fadeInLeft" delay={500} style={css.header}>
        <Text style={css.bemVindo}>Seja Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={css.formLogin}>
        <Text style={css.title}>Email</Text>
        <TextInput
          style={css.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={css.title}>Senha</Text>
        <TextInput
          style={css.input}
          placeholder="Digite sua senha"
          secureTextEntry={isPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={css.btnContainer}>
          <Button onPress={handleLogin} title="Entrar" />

          <TouchableHighlight {...touchProps} onPress={handleSignUp}>
            <Text style={css.btnTextRegister}>Cadastrar-se</Text>
          </TouchableHighlight>
        </View>
      </Animatable.View>
    </View>
  );
};
export default Login;
