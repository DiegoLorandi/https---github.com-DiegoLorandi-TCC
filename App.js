import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import NetInfo from '@react-native-community/netinfo';
import { db } from './firebase';
import getRealm from './src/services/realm';
import AnimaisSchema from './src/schemas/Animais';
import CompradoresSchema from './src/schemas/Compradores';

export default function App() {
  useEffect(() => {
    // NetInfo.addEventListener(handleConnectivyChange);
  }, []);

  function handleConnectivyChange(state) {
    if (state.isConnected) {
      // Animais
      registerRealmDBToFirebase('Animais', 'idAnimal', ['tipoDado']);
      setRegisterFirebaseToRealmDB(
        'Animais',
        [
          ...Object.keys(AnimaisSchema.properties).filter(
            (key) => key != 'tipoDado',
          ),
        ],
        { tipoDado: 'consultados' },
      );
      // Compradores
      setRegisterFirebaseToRealmDB(
        'Compradores',
        [
          ...Object.keys(CompradoresSchema.properties).filter(
            (key) => key != 'tipoDado' && key != 'id',
          ),
        ],
        { tipoDado: 'consultados' },
        true,
      );
      registerRealmDBToFirebase('Compradores', 'email', ['tipoDado', 'id']);
    }
  }
  // Registra dados do realmDB no firestore
  async function registerRealmDBToFirebase(schema, filtered, ignoreKeys = []) {
    try {
      const realm = await getRealm();
      const dataArr = realm.objects(schema).filtered(`tipoDado == 'cadastro'`);
      const dataCollection = db.collection(schema.toLowerCase());
      for (const data of dataArr) {
        try {
          ignoreKeys.forEach((key) => delete data[key]);
          dataCollection.add(data);
          realm.write(() => {
            realm.delete(
              realm
                .objects(schema)
                .filtered(`${filtered} = ${data[filtered]}`)
                .pop(),
            );
          });
        } catch (e) {}
      }
    } catch (e) {}
  }

  // Registra 50 dados do firestore no realmdb
  async function setRegisterFirebaseToRealmDB(
    schema,
    dataKeys = [],
    extraData = {},
    hasId = false,
  ) {
    try {
      const dataCollection = db.collection(schema.toLowerCase());
      const resultado = await dataCollection.limit(50).get();
      const realm = await getRealm();
      realm.write(() => {
        realm.delete(
          realm.objects(schema).filtered(`tipoDado = 'consultados'`),
        );

        resultado.forEach((doc) => {
          var data = { ...extraData };
          if (hasId == true) {
            data = { ...data, id: doc.id };
          }
          if (
            Object.values(doc.data()).some((value) => value == undefined) ==
            false
          ) {
            console.log(doc.data());
            dataKeys.forEach((dataKey) => {
              data[dataKey] = doc.data()[dataKey];
            });
          }
          console.log({
            schema,
            data,
          });
          realm.create(schema, data);
        });
      });
    } catch (e) {}
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFE4C4" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
