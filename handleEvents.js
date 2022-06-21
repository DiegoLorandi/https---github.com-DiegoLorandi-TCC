import { db } from './src/services/firebase';
import getRealm from './src/services/realm';
import sincronizaAnimais from './sincronizaAnimais';
import sincronizaCompradores from './sincronizarCompradores';

function handleConnectivyChange(state) {
  if (state.isConnected) {
    sincronizaAnimais();
    sincronizaCompradores();
  }
}
// Registra dados do realmDB no firestore
async function registerRealmDBToFirebase(schema, filtered, ignoreKeys = []) {
  try {
    const realm = await getRealm();
    const dataArr = realm.objects(schema).filtered(`tipoDado == 'cadastro'`);
    const dataCollection = db.collection(schema.toLowerCase());
    for (const data of dataArr) {
      console.log('passou 2');
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
  } catch (e) {
    // console.clear();
    console.log('erro:');
    // console.log(e);
    console.log('[ERRO]: registerRealmDBToFirebase()');
    console.log('[ERRO]: falha ao sincronizar dados. ');
  }
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
      realm.delete(realm.objects(schema).filtered(`tipoDado = 'consultados'`));
      resultado.forEach((doc) => {
        var data = { ...extraData };
        if (hasId == true) {
          data = { ...data, id: doc.id };
        }
        if (
          Object.values(doc.data()).some((value) => value == undefined) == false
        ) {
          console.log(doc.data());
          dataKeys.forEach((dataKey) => {
            data[dataKey] = doc.data()[dataKey];
          });
        }
        realm.create(schema, data);
      });
    });
  } catch (e) {
    console.log(e);
    console.log('[ERRO]: setRegisterFirebaseToRealmDB()');
    console.log('[ERRO]: Falha ao sincronizar dados');
  }

  setTimeout(async () => {
    const realm = await getRealm();
    console.log('Animais sincronizados:');
    console.log(realm.objects('Animais'));
  }, 2000);
}

export default handleConnectivyChange;
