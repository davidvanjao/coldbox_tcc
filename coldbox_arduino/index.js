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


// Parâmetros da simulação
const temperaturaMedia = 3;   // Temperatura média em °C
const desvioPadrao = 4;      // Desvio padrão para variações aleatórias
const intervaloLeitura = 1800000;  // Intervalo de 30 minutos (1800000 ms)

//id do equipamento
const equip_id = 1;

// Função para gerar uma leitura de temperatura simulada
function lerTemperaturaSimulada() {
    // Geração de um valor aleatório com distribuição normal
    let random = Math.random();
    let variacao = (random - 0.5) * 2 * desvioPadrao;
    return temperaturaMedia + variacao;
}

// Função para gerar uma leitura de umidade simulada
function lerUmidadeSimulada() {
    // Geração de um valor aleatório com distribuição normal
    let dados_umid = getRandomInRange(50, 90);
    return dados_umid;
}

// Função para gerar uma leitura de temperatura simulada
async function lerDataSimulada(equip_id) {

    // Definição da instrução SQL de seleção
    const sql = `select * from novo_equipamento_dados where equip_id = ? order by dados_data desc limit 1`;

    // Definição do parâmetro para o SELECT
    const values = [equip_id]; // 'equip_id' seria a variável que você quer usar para filtrar os dados

    // Execução da instrução SQL passando o parâmetro
    const execSql = await db.query(sql, values);

    // O resultado do SELECT estará armazenado em execSql
    const resultado = execSql[0]; // Pega a primeira linha do resultado

    const dataHora = resultado ? resultado[0].dados_data : null; // Verifica se existe resultado e pega 'dados_data'

    // Adicionar 30 minutos
    dataHora.setMinutes(dataHora.getMinutes() + 30);

    // Exibe os dados do equipamento
    //console.log(dataHora);

    return dataHora;
}

//cadastrar dados do arduino
async function novoCadastrar(dados_temp, dados_umid, equip_id, dados_data) {
    try {

        const param_minimo = -1;
        const param_max = 5;

        // Instrução SQL
        const sql = `INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id, dados_data) VALUES (?, ?, ?, ?)`;

        // Definição dos dados a serem inseridos em um array
        const values = [dados_temp, dados_umid, equip_id, dados_data];

        //Execução da instrução sql passando os parâmetros
        const execSql = await db.query(sql, values); 

        //pega a linha que foi inserida
        const dados_id = execSql[0].insertId;   

        //verifica se a temperatura esta dentro do parametro
        if (dados_temp >= param_minimo && dados_temp <= param_max) {

            console.log('Valor dentro do intervalo', dados_temp);

        } else {
            console.log('Emitiu alerta: ', dados_temp);

            //verifica o tipo de alerta
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


const interval = setInterval(async () => {
    n++;
    //console.log('repete' + ' ' + n);
    //cadastrar();
    const dados_temp = parseFloat(lerTemperaturaSimulada().toFixed(2));
    const dados_umid = lerUmidadeSimulada();
    const dados_data = await lerDataSimulada(1);

    //console.log(dados_data);

    novoCadastrar(dados_temp, dados_umid, equip_id, dados_data);

}, 10000); // 1800000 milissegundos = 30 minutos


interval;
