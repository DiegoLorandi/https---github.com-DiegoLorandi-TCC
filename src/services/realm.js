import Realm from 'realm';
import AnimaisSchema from '../schemas/Animais';
import CompradoresSchema from '../schemas/Compradores';

export default async function getRealm() {
  return await Realm.open({
    schema: [AnimaisSchema, CompradoresSchema],
    // deleteRealmIfMigrationNeeded: true,
  });
}
