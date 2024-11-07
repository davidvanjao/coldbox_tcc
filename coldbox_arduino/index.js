const express = require('express');
const cors = require('cors');
const db = require('./conexao');

const app = express();
const porta = 3334;

// Parâmetros da simulação
const temperaturaMedia = 1;   // Temperatura média em °C
const desvioPadrao = 4;      // Desvio padrão para variações aleatórias
const intervaloLeitura = 1800000;  // Intervalo de 30 minutos (1800000 ms)

app.use(cors());
app.use(express.json());


//inicia o servidor
app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

//rota de teste
app.get('/', (request, response) => response.send());

// Função utilitária para gerar um número aleatório dentro de um intervalo
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerar uma leitura de temperatura simulada
const lerTemperaturaSimulada = () => {
    const variacao = (Math.random() - 0.5) * 2 * desvioPadrao;
    return temperaturaMedia + variacao;
}

// Função para gerar um valor de umidade simulada
const lerUmidadeSimulada = () => getRandomInRange(50, 90);

// Retorna o próximo id de equipamento aleatoriamente
const gerarNumeroEquipamento = () => Math.floor(Math.random() * 6) + 1;


// Função para gerar uma leitura de temperatura simulada
async function lerParametroCadastrado(equip_id) {
    const sql = `select * from novo_equipamento_parametro2 where equip_id = ?;`;
    const [parametro] = await db.query(sql, [equip_id]);
    return parametro[0];
}

// Consulta a última data registrada para um equipamento e incrementa 30 minutos
async function lerDataSimulada(equip_id) {
    const sql = `SELECT dados_data FROM novo_equipamento_dados WHERE equip_id = ? ORDER BY dados_data DESC LIMIT 1`;
    const [registro] = await db.query(sql, [equip_id]);
    const ultimaData = registro.length ? new Date(registro[0].dados_data) : new Date();
    ultimaData.setMinutes(ultimaData.getMinutes() + 30);
    return ultimaData;
}

//cadastrar dados do arduino
async function novoCadastrar(dados_temp, dados_umid, equip_id, dados_data) {
    try {

        const { param_minimo: param_minimo, param_maximo: param_max } = await lerParametroCadastrado(equip_id);

        // Instrução SQL
        const sql = `INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id, dados_data) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [dados_temp, dados_umid, equip_id, dados_data]);
        const dados_id = result.insertId;

        // Verifica se a temperatura está dentro do intervalo permitido
        if (isTemperaturaDentroIntervalo(dados_temp, param_minimo, param_max)) {
            console.log('Temperatura dentro do intervalo:', dados_temp);
        } else {
            console.log('Alerta emitido devido à temperatura:', dados_temp);

            //verifica o tipo de alerta
            if(dados_temp <= param_minimo) {

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
        console.error('Erro ao registrar leitura:', error);
    }
}


// Função auxiliar para verificar se a temperatura está dentro do intervalo permitido
function isTemperaturaDentroIntervalo(temp, min, max) {
    return temp >= min && temp <= max;
}



//grava um alerta
async function emitirAlerta(equip_id, alerta_id, dados_id) {
    try { 
        // instrução SQL
        const sql = `INSERT INTO novo_equipamento_alertas_enviados (equip_id, alerta_id, dados_id) VALUES (?, ?, ?);`;
        await db.query(sql, [equip_id, alerta_id, dados_id]);

    } catch (error) {
        console.error('Erro ao emitir alerta:', error);
    }
}

setInterval(async () => {
    const dados_temp = parseFloat(lerTemperaturaSimulada().toFixed(2));
    const dados_umid = lerUmidadeSimulada();
    const dados_data = await lerDataSimulada(1);
    const equip_id = gerarNumeroEquipamento();

    await novoCadastrar(dados_temp, dados_umid, equip_id, dados_data);

}, 10000); // 1800000 milissegundos = 30 minutos

