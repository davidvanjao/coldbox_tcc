const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Inicializar o Google Cloud Storage usando as credenciais
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // Pegando o ID do projeto via variável de ambiente
  keyFilename: path.join(process.cwd(), process.env.GOOGLE_CLOUD_KEY_FILE_PATH) // Pegando o caminho das credenciais
});

// Nome do bucket (vem da variável de ambiente)
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);

// Função para upload da imagem
async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const { originalFilename, filepath } = file; // Certifique-se de que originalFilename e filepath existem
    if (!originalFilename) {
      reject(new Error('Nome do arquivo não especificado'));
      return;
    }

    const blob = bucket.file(originalFilename);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    }).on('error', (err) => {
      reject(err);
    });

    blobStream.end(filepath);
  });
}

module.exports = {
  uploadImage,
};
