import * as React from 'react';
import { View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AnimaisMain from '../pages/AnimaisMain';
import CompradoresMain from '../pages/CompradoresMain';
import CadastrarAnimal from '../pages/CadastrarAnimal';
import ConsultarAnimal from '../pages/ConsultarAnimal';
import GerenciarAnimais from '../pages/GerenciarAnimais';
import CadastrarComprador from '../pages/CadastrarComprador';
import GerenciarComprador from '../pages/GerenciarComprador';
import ConsultarComprador from '../pages/ConsultarComprador';
import GerarRelatorios from '../pages/GerarRelatorios';
import AtualizarAnimal from '../pages/AtualizarAnimal';
import AtualizarPeso from '../pages/AtualizarPeso';
import Home from '../pages/Home';
import Login from '../pages/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NavigationStack = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#00BFFF',
      inactiveTintColor: '#DCDCDC',
      activeBackgroundColor: '#4682B4',
      inactiveBackgroundColor: '#4682B4',
    }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Animais"
      component={AnimaisMain}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <Feather name="book" size={25} color={color} />;
        },
      }}
    />

    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <Feather name="home" size={25} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Compradores"
      component={CompradoresMain}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <Feather name="user" size={25} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);

const MyStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={NavigationStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AnimaisMain" component={AnimaisMain} />

      <Stack.Screen name="CompradoresMain" component={CompradoresMain} />

      <Stack.Screen name="Cadastrar Animal" component={CadastrarAnimal} />

      <Stack.Screen name="Atualizar Peso" component={AtualizarPeso} />

      <Stack.Screen name="Consultar Animal" component={ConsultarAnimal} />

      <Stack.Screen name="Gerenciar Animais" component={GerenciarAnimais} />

      <Stack.Screen name="Cadastrar Comprador" component={CadastrarComprador} />

      <Stack.Screen name="Consultar Comprador" component={ConsultarComprador} />

      <Stack.Screen name="Gerenciar Comprador" component={GerenciarComprador} />

      <Stack.Screen name="Gerar Relatórios" component={GerarRelatorios} />

      <Stack.Screen
        name="AtualizarAnimal"
        options={{ title: 'Atualizar Animal' }}
        component={AtualizarAnimal}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default MyStack;
