import React from 'react';
import {Text, View } from 'react-native';
export default function Page(props){ // função Page que recebe "props" como parâmetros
    return(
        <View>
            <Text>Texto de Exemplo : {props.texto}, Autor: {props.autor}</Text>
        </View>
    );
}