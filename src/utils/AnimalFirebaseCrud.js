import { db } from '../services/firebase';

const Read = async (animalId = undefined, cb = undefined) => {
  const animaisCollection = db.collection('animais');
  try {
    var animalData = {};
    var document = {};
    var getAnimais = await animaisCollection
      .where('idAnimal', '==', '' + animalId + '')
      .get();

    getAnimais.forEach((doc) => {
      animalData = {
        id: doc.id,
      };
      animalData = { ...doc.data(), ...animalData };
      document = doc;
    });

    var getPesoAnimal = await animaisCollection
      .doc(animalData.id)
      .collection('pesoAnimal')
      .doc('' + animalData.pesoId + '')
      .get();

    if (getPesoAnimal) {
      animalData = { ...animalData, ...getPesoAnimal.data() };
    }
    if (cb) {
      cb(document);
    }
    return animalData;
  } catch (e) {
    return e;
  }
};

const Update = async (animalId = undefined, newPeso = undefined) => {
  const animaisCollection = db.collection('animais');
  var docId = '';
  var pesoId;
  await Read(animalId, (doc) => {
    docId = doc.id;
    pesoId = doc.data().pesoId; //recebe o pesoId que está no documento
    newDataAnimal ? doc.ref.update({ dataNascimento: newDataAnimal }) : '';
    newRacaAnimal ? doc.ref.update({ racaAnimal: newRacaAnimal }) : '';
    newSexoAnimal ? doc.ref.update({ sexoAnimal: newSexoAnimal }) : '';
    newStatusAnimal ? doc.ref.update({ statusAnimal: newStatusAnimal }) : '';
  });

  if (newPeso) {
    var newPesoId = pesoId + 1; //soma 1 na variável pesoId
    await animaisCollection
      .doc(docId)
      .set({ pesoId: newPesoId }, { merge: true }); //atualiza o pesoId do documento do animal
    await db
      .collection('animais')
      .doc(docId)
      .collection('pesoAnimal')
      .doc('' + newPesoId + '')
      .set({
        idAnimal: animalId,
        pesoAnimal: newPeso,
        data: new Date(),
      });
  }

  return docId;
};

const Delete = async (animalId) => {
  await Read(animalId, (doc) => {
    doc.ref.delete();
  });
};

const Create = async (data, pesoData, cb = undefined) => {
  const animaisCollection = db.collection('animais');
  try {
    var docId = '';
    await animaisCollection.add(data).then((dataCollection) => {
      docId = dataCollection.id;
    });
    db.collection('animais').doc(docId).collection('pesoAnimal').doc('1').set({
      idAnimal: pesoData.newIdAnimal,
      pesoAnimal: pesoData.newPesoAnimal,
      data: new Date(),
    });
    if (cb) {
      cb(docId);
    }
  } catch (error) {
    alert(error.message);
  }
};

const AnimalFirebaseCrud = {
  Read,
  Update,
  Delete,
  Create,
};

export default AnimalFirebaseCrud;
