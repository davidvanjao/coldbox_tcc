const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {//ok
        try {

            //parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            //instruções SQL 
            // const sql = `SELECT a.dados_id, b.equip_modelo, b.equip_tipo, a.dados_umid, a.dados_temp, a.dados_data
            // FROM 
            //     novo_equipamento_dados a,
            //     novo_equipamento b
            // WHERE
            //     a.equip_id = b.equip_id
            // AND b.equip_id = ?`;

            const sql = `SELECT a.dados_id, c.local_nome, b.equip_modelo, b.equip_tipo, a.dados_temp, a.dados_umid, a.dados_data
            FROM 
                novo_equipamento_dados a,
                novo_equipamento b,
                novo_local c,
                novo_equipamento_local d    
            WHERE
                a.equip_id = b.equip_id
            AND a.equip_id = d.equip_id
            AND d.local_id = c.local_id
            AND b.equip_id = ?;`;

            // preparo do array com dados que serão atualizados
            const values = [equip_id];                     

            //executa instruções SQL e armazena o resultado na variável usuários
            const dadosEquipamento = await db.query(sql, values); 
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

    async cadastrar(request, response) {//ok
        try {
            // parâmetros recebidos no corpo da requisição
            const { dados_temp, dados_umid, equip_id} = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id) VALUES (?, ?, ?);`;

            // definição dos dados a serem inseridos em um array
            const values = [dados_temp, dados_umid, equip_id];  

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

