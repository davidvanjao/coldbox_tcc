const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select a.dados_id, c.loc_id, c.loc_razaoSocial, a.equip_id, b.equip_nome,  a.dados_temp, a.dados_umid, a.dados_data
                from 
                    dados a, 
                    equipamento b,
                    localizacao c
                where 
                    a.equip_id = b.equip_id
                and b.loc_id = c.loc_id;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const dadosEquipamento = await db.query(sql); 
            const nItens = dadosEquipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Dados por equipamento.', 
                dados: dadosEquipamento[0], 
                nItens                 
            });

        } catch (error) {
            //console.log(error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    async cadastrar(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { equip_id, dados_temp, dados_umid, dados_data} = request.body;

            // instrução SQL
            const sql = `INSERT INTO dados (equip_id, dados_temp, dados_umid, dados_data) VALUES (?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_id, dados_temp, dados_umid, dados_data];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const dados_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Dados cadastrado com sucesso.', 
                dados: dados_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },
}

