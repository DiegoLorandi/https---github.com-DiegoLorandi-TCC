import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home'
import Login from '../Login'

const Stack = createNativeStackNavigator();

const TesteScreen = () => (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    </NavigationContainer>
);
export default TesteScreen