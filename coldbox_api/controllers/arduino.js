const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async cadastrarTemperaturaUmidade(request, response) {
        try {
            const { dados_temp, dados_umid, equip_id } = request.body;
            const dados_data = new Date(); // Gera a data e hora atuais no servidor
    
            if (!dados_temp || !dados_umid || !equip_id) {
                return response.status(400).json({ 
                    sucesso: false, 
                    mensagem: 'Parâmetros inválidos. Verifique os dados enviados.' 
                });
            }
    
            const sql = `INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, dados_data, equip_id) VALUES (?, ?, ?, ?)`;
            const values = [dados_temp, dados_umid, dados_data, equip_id];
    
            await db.execute(sql, values);
    
            // Envia a resposta indicando sucesso
            return response.status(201).json({
                sucesso: true,
                mensagem: 'Dados de temperatura e umidade inseridos com sucesso.'
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao inserir dados de temperatura e umidade.',
                dados: error.message
            });
        }
    },

    // Função para gerar uma leitura de temperatura simulada
    async lerParametroCadastrado(equip_id) {
        const sql = `select * from novo_equipamento_parametro2 where equip_id = ?;`;
        const [parametro] = await db.query(sql, [equip_id]);
        return parametro[0];
    }
    
    
}

