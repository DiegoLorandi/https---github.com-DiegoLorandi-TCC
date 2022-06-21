import { db } from './src/services/firebase';
import getRealm from './src/services/realm';

export default async function sincronizaAnimais() {
  const dataCollection = db.collection('animais');
  const resultado = await dataCollection.limit(50).get();
  const realm = await getRealm();
  try {
    realm.write(() => {
      const animaisDelete = realm
        .objects('Animais')
        .filtered(`tipoDado == 'online'`);
      console.log(animaisDelete);
      realm.delete(animaisDelete);
      resultado.forEach(async (doc) => {
        if (
          Object.values(doc.data()).some((data) => data == undefined) ==
            false &&
          Object.values(doc.data()).length > 0
        ) {
          const data = {
            idAnimal: doc.data().idAnimal,
            pesoId: doc.data().pesoId,
            dataNascimento: doc.data().dataNascimento,
            racaAnimal: doc.data().racaAnimal,
            sexoAnimal: doc.data().sexoAnimal,
            statusAnimal: doc.data().statusAnimal,
            tipoDado: 'online',
          };
          var getPesoAnimal = await dataCollection
            .doc(doc.id)
            .collection('pesoAnimal')
            .doc('' + doc.data().pesoId + '')
            .get();
          let pesoAnimalBuscado = getPesoAnimal.data()?.pesoAnimal;
          if (!pesoAnimalBuscado) {
            return;
          }
          data['peso'] = pesoAnimalBuscado;
          realm.create('Animais', data);
        } else {
        }
      });
    });
    // realm.close();
  } catch (e) {
    console.log('Falha ao sincronizar dados!');
  }
}
