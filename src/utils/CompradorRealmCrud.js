import getRealm from '../services/realm';

async function Create(data) {
  if (Object.values(data).some((value) => value == '') === true) {
    return new Promise((resolve, reject) =>
      reject('Preencha os dados corretamente.'),
    );
  }
  const realm = await getRealm();
  return new Promise(async (resolve, reject) => {
    try {
      realm.write(() => {
        realm.create('Compradores', {
          ...data,
          tipoDado: 'cadastro',
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function Read(cpf = null) {
  const realm = await getRealm();
  if (cpf) {
    const comprador = realm.objects('Compradores').filtered(`id == '${cpf}'`);
    return comprador;
  } else {
    const compradoresObject = realm
      .objects('Compradores')
      .filtered(`tipoDado == 'online'`);
    var allCompradores = [];
    compradoresObject.forEach((comprador) => {
      allCompradores.push({
        cpf: comprador.id,
        telefone: comprador.telefone,
        nome: comprador.nome,
        cep: comprador.cep,
        numero: comprador.numero,
        rua: comprador.rua,
        bairro: comprador.bairro,
        municipio: comprador.municipio,
        estado: comprador.estado,
        email: comprador.email,
      });
    });

    return allCompradores;
  }
}

const CompradorRealmCrud = {
  Create,
  Read,
};
export default CompradorRealmCrud;
