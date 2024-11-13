const express = require('express'); 
const cors = require('cors'); 
const path = require('path');

const router = require('./routers/routers');

const app = express(); 
app.use(cors()); 
app.use(express.json()); 


// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(router);

// const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/', (request, response) => {
    response.send('teste 6');
});

