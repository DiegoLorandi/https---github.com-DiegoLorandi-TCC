import Realm from 'realm';
import AnimaisSchema from '../schemas/Animais';

export default async function getRealm() {
  return await Realm.open({
    schema: [AnimaisSchema],
    // deleteRealmIfMigrationNeeded: true,
  });
}
