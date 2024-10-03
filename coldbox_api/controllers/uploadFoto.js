const formidable = require('formidable');
const { uploadImage } = require('../lib/googleStorage'); // Função para o Google Cloud Storage

exports.upload = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao processar o formulário' });
    }

    try {
      const file = files.file; // Certifique-se de que o campo é 'file'
      if (!file) {
        return res.status(400).json({ sucesso: false, mensagem: 'Nenhum arquivo foi enviado' });
      }

      const publicUrl = await uploadImage(file); // Faz o upload para o Google Cloud Storage
      return res.status(200).json({ sucesso: true, url: publicUrl });
    } catch (error) {
      console.error('Erro ao fazer upload da imagem', error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao fazer upload da imagem' });
    }
  });
};
