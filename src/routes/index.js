import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimaisMain from '../pages/AnimaisMain'
import CompradoresMain from '../pages/CompradoresMain'
import CadastrarAnimal from '../pages/CadastrarAnimal'
import ConsultarAnimal from '../pages/ConsultarAnimal'
import GerenciarAnimais from '../pages/GerenciarAnimais'
import CadastrarComprador from '../pages/CadastrarComprador'
import GerenciarComprador from '../pages/GerenciarComprador'
import ConsultarComprador from '../pages/ConsultarComprador'
import GerarRelatorios from '../pages/GerarRelatorios'
import Home from '../pages/Home'
import Login from '../pages/Login'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NavigationStack = () => (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="AnimaisMain" component={AnimaisMain} options={{ headerShown: false }}/>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Tab.Screen name="CompradoresMain" component={CompradoresMain} options={{ headerShown: false }}/>
      </Tab.Navigator>
);

const MyStack = () => (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Home"
                component={NavigationStack}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
      name="AnimaisMain"
      component={AnimaisMain}
    />

    <Stack.Screen
      name="CompradoresMain"
      component={CompradoresMain}
    />

    <Stack.Screen
      name="Cadastrar Animal"
      component={CadastrarAnimal}
    />

    <Stack.Screen
      name="Consultar Animal"
      component={ConsultarAnimal}
    />

    <Stack.Screen
      name="Gerenciar Animais"
      component={GerenciarAnimais}
    />

    <Stack.Screen
      name="Cadastrar Comprador"
      component={CadastrarComprador}
    />

    <Stack.Screen
      name="Consultar Comprador"
      component={ConsultarComprador}
    />

    <Stack.Screen
      name="Gerenciar Comprador"
      component={GerenciarComprador}
    />

    <Stack.Screen
      name="Gerar Relatórios"
      component={GerarRelatorios}
    />

        </Stack.Navigator>
    </NavigationContainer>
);
export default MyStack 

