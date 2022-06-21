import { db } from '../services/firebase';
const Create = async (data) => {
  const dataAux = {
    nome: data.nome,
    telefone: data.telefone,
    cep: data.cep,
    numero: data.numero,
    rua: data.rua,
    bairro: data.bairro,
    municipio: data.municipio,
    estado: data.estado,
    email: data.email,
  };

  if (Object.values(data).some((value) => value == '') === true) {
    return new Promise((resolve, reject) =>
      reject('Preencha os dados corretamente.'),
    );
  } else {
    const compradoresCollection = db.collection('compradores');
    return new Promise(async (resolve, reject) => {
      try {
        await compradoresCollection.doc(data.cpf).set(dataAux);
        resolve(true);
      } catch (e) {
        reject(false);
      }
    });
  }
};

const Read = async (cpf = '') => {
  const compradoresCollection = db.collection('compradores');
  if (cpf == '') {
    const getCompradores = await compradoresCollection.get();
    var allCompradores = [];
    getCompradores.forEach(async (doc) => {
      if (doc.id) {
        allCompradores.push({
          cpf: doc.id,
          telefone: doc.data().telefone,
          nome: doc.data().nome,
          cep: doc.data().cep,
          numero: doc.data().numero,
          rua: doc.data().rua,
          bairro: doc.data().bairro,
          municipio: doc.data().municipio,
          estado: doc.data().estado,
          email: doc.data().email,
        });
      }
    });
    return allCompradores;
  } else {
    return await compradoresCollection.doc(cpf).get();
  }
};

const Delete = async (comprador, cb = undefined) => {
  const compradoresCollection = db.collection('compradores');
  const getComprador = compradoresCollection.where(
    'email',
    '==',
    '' + comprador.email + '',
  );
  await getComprador.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      if (cb) {
        cb(doc);
      }
      doc.ref.delete();
    });
  });
};

const CompradorFirebaseCrud = {
  Create,
  Read,
  Delete,
};

export default CompradorFirebaseCrud;
