const express = require('express');
const cors = require('cors');

const db = require('./conexao');
// const router = require('./routers/routers');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(router);

// const porta = process.env.PORT || 3333;
const porta = 3334;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/', (request, response) => {
    response.send('teste 6');
});

let n = 0;
const interval = setInterval(() => {
    n++;
    console.log('repete' + ' ' + n);
    cadastrar();
}, 6000);

interval;

async function cadastrar(request, response) {
    try {
        // parâmetros recebidos no corpo da requisição

        const equip_id = getRandomInRange(1, 4);;
        const dados_temp = getRandomInRange(-4, 6);
        const dados_umid = getRandomInRange(50, 90);
        const data = new Date();

        // instrução SQL
        const sql = `INSERT INTO dados (equip_id, dados_temp, dados_umid, dados_data) VALUES (?, ?, ?, ?)`;

        // definição dos dados a serem inseridos em um array
        const values = [equip_id, dados_temp, dados_umid, data];

        // execução da instrução sql passando os parâmetros
        await db.query(sql, values); 

        //identificação do ID do registro inserido
        // const dados_id = execSql[0].insertId;           

    } catch (error) {
        console.log(error);
    }
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}