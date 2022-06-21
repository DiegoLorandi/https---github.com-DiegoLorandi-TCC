const Read = async (animalId) => {
  const realm = await getRealm();
  const animal = realm.objects('Animais').filtered(`idAnimal == '${animalId}'`);
  return animal;
};

const Create = async (data) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create('Animais', {
      ...data,
      peso: newPesoAnimal,
      tipoDado: 'cadastro',
    });
  });
};

const AnimalRealmCrud = {
  Read,
  Create,
};

export default AnimalRealmCrud;
