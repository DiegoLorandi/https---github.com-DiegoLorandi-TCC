import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home'
import AnimaisMain from '../pages/AnimaisMain'
import CompradoresMain from '../pages/CompradoresMain'
import CadastrarAnimal from '../pages/CadastrarAnimal'
import CadastrarComprador from '../pages/CadastrarComprador'
import ConsultarInfo from '../pages/ConsultarInfo'
import GerenciarAnimais from '../pages/GerenciarAnimais'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const HomeScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
    />
  </Stack.Navigator>
);
const AnimaisMainScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AnimaisMain"
      component={AnimaisMain}
    />
  </Stack.Navigator>
);
const CompradoresMainScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CompradoresMain"
      component={CompradoresMain}
    />
  </Stack.Navigator>
);
const CadastrarAnimalScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CadastrarAnimal"
      component={CadastrarAnimal}
    />
  </Stack.Navigator>
);
const CadastrarCompradorScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CadastrarComprador"
      component={CadastrarComprador}
    />
  </Stack.Navigator>
);
const ConsultarInfoScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ConsultarInfo"
      component={ConsultarInfo}
    />
  </Stack.Navigator>
);
const GerenciarAnimaisScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="GerenciarAnimais"
      component={GerenciarAnimais}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="AnimaisMain" component={AnimaisMainScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="CompradoresMain" component={CompradoresMainScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

export default App;