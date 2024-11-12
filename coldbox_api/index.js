const express = require('express'); 
const cors = require('cors'); 
// const path = require('path');

const router = require('./routers/routers');

const app = express(); 
app.use(cors()); 
app.use(express.json()); 



// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar a pasta D:/FotosPerfil como um diretório estático
app.use('/uploads', express.static('D:/FotosPerfil'));

app.use(router);

// const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/', (request, response) => {
    response.send('teste 6');
});

