import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome'
import CrudAnimais from '../pages/CrudAnimais'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const CrudStack = createNativeStackNavigator();

const WelcomeScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Welcome"
      component={Welcome}
    />
  </HomeStack.Navigator>
);
const CrudScreen = () => (
  <CrudStack.Navigator>
    <CrudStack.Screen
      name="CrudAnimais"
      component={CrudAnimais}
    />
  </CrudStack.Navigator>
);

const App = () => {
  return (
      <Tab.Navigator initialRouteName="Welcome">
        <Tab.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="CrudAnimais" component={CrudScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

export default App;