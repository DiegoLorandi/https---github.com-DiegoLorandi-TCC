import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../pages/Login'
import Welcome from '../pages/Welcome'
import CrudAnimais from '../pages/CrudAnimais'

const Stack = createNativeStackNavigator();



const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Welcome" component={Welcome} />
        <Tab.Screen name="CrudAnimais" component={CrudAnimais} />
      </Tab.Navigator>
  );
}