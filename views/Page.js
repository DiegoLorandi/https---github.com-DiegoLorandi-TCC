import React from 'react';
import {Text, View } from 'react-native';
import {css} from '../assets/css/Css'
export default function Page(props){
    return(
        <View>
            <Text>Texto de Exemplo : {props.texto}, Autor: {props.autor}</Text>
        </View>
    );
}