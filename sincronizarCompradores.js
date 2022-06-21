import getRealm from './src/services/realm';
import { db } from './src/services/firebase';

export default async function sincronizaCompradores() {
  const dataCollection = db.collection('compradores');
  const resultado = await dataCollection.limit(50).get();
  const realm = await getRealm();
  try {
    realm.write(() => {
      realm.delete(
        realm.objects('Compradores').filtered(`tipoDado == 'online'`),
      );
      resultado.forEach(async (doc) => {
        if (
          Object.values(doc.data()).some((data) => data == undefined) ==
            false &&
          Object.values(doc.data()).length > 0
        ) {
          const data = {
            id: doc.id,
            bairro: doc.data().bairro,
            cep: doc.data().cep,
            email: doc.data().email,
            estado: doc.data().estado,
            municipio: doc.data().municipio,
            nome: doc.data().nome,
            numero: doc.data().numero,
            rua: doc.data().rua,
            telefone: doc.data().telefone,
            tipoDado: 'online',
          };
          realm.create('Compradores', data);
        } else {
        }
      });
    });
  } catch (e) {
    console.log('Falha ao sincronizar dados!');
  }
}
