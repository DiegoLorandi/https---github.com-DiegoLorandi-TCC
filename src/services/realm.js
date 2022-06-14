import Realm from 'realm';
import AnimaisSchema from '../schemas/Animais';
import CompradoresSchema from '../schemas/Compradores';
import UsuarioSchema from '../schemas/Usuario';

export default async function getRealm() {
  return await Realm.open({
    schema: [AnimaisSchema, CompradoresSchema, UsuarioSchema],
    deleteRealmIfMigrationNeeded: true,
  });
}
