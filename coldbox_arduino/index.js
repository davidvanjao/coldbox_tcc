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
    //console.log('repete' + ' ' + n);
    cadastrar();
}, 5000); // 1800000 milissegundos = 30 minutos


interval;

async function cadastrar(request, response) {
    try {
        // Loop pelos 4 equip_id (de 1 a 4)
        //for (let equip_id = 1; equip_id <= 5; equip_id++) {
            const dados_temp = getRandomInRange(-4, 6);
            const dados_umid = getRandomInRange(50, 90);
            //const data = new Date();
            const equip_id = 1;

            //valores aceitos: -2, -1, 0, 1, 2, 3, 4, 5
            const param_minimo = -2; //-3
            const param_max = 5;

            // Instrução SQL
            const sql = `INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id) VALUES (?, ?, ?)`;

            // Definição dos dados a serem inseridos em um array
            const values = [dados_temp, dados_umid, equip_id,];

            //Execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //pega a linha que foi inserida
            const dados_id = execSql[0].insertId;   

            if (dados_temp >= param_minimo && dados_temp <= param_max) {

                console.log('Valor dentro do intervalo', dados_temp);

            } else {
                console.log('Emitiu alerta: ', dados_temp);

                if(dados_temp < param_minimo) {

                    //temperatura menor
                    const alerta_id = 2;

                    emitirAlerta(equip_id, alerta_id, dados_id)

                } else {

                    //temperatura maior
                    const alerta_id = 1;

                    emitirAlerta(equip_id, alerta_id, dados_id)

                }
                
            }

        //}
        
    } catch (error) {
        console.log(error);
    }
}

//grava um alerta
async function emitirAlerta(equip_id, alerta_id, dados_id) {
    try { 

        // instrução SQL
        const sql = `INSERT INTO novo_equipamento_alertas_enviados (equip_id, alerta_id, dados_id) VALUES (?, ?, ?);`;

        // definição dos dados a serem inseridos em um array
        const values = [equip_id, alerta_id, dados_id];  

        // execução da instrução sql passando os parâmetros
        await db.query(sql, values);    

    } catch (error) {
        console.log(error);
    }
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

