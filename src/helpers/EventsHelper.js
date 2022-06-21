import getRealm from '../services/realm';
import { db } from '../../firebase';

// Registra dados locais no firebase
async function registerFirestoreToRealmDB(schema, filtered) {
  const realm = await getRealm();
  const dataArr = realm.objects(schema).filtered(`tipoDado == 'cadastro'`);
  const dataCollection = db.collection(schema.toLowerCase());
  for (const data of dataArr) {
    try {
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
}

async function eventNetInfoChange(state) {
  if (state.isConnected) {
    // Animais
    registerFirestoreToRealmDB('Animais', 'idAnimal');
    // Compradores
    registerFirestoreToRealmDB('Compradores', 'email');
  }
}

export default EventsHelper = {
  eventNetInfoChange,
};
