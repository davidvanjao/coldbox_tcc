const express = require('express');
const cors = require('cors');
const db = require('./conexao');

const app = express();
app.use(cors());
app.use(express.json());

const porta = 3334;
//teste

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
}, 6000); // 1800000 milissegundos = 30 minutos


interval;

async function cadastrar(request, response) {
    try {
        // Loop pelos 4 equip_id (de 1 a 4)
        for (let equip_id = 1; equip_id <= 3; equip_id++) {
            const dados_temp = getRandomInRange(-4, 6);
            //const dados_umid = getRandomInRange(50, 90);
            //const data = new Date();

            // Instrução SQL
            const sql = `INSERT INTO novo_equipamento_dados (dados_temp, equip_id) VALUES (?, ?)`;

            // Definição dos dados a serem inseridos em um array
            const values = [dados_temp, equip_id,];

            // Execução da instrução sql passando os parâmetros
            await db.query(sql, values); 
        }
        
    } catch (error) {
        console.log(error);
    }
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
