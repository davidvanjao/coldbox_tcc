const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select a.equip_id, a.equip_nome, a.equip_modelo, a.equip_tipo, a.equip_status, a.equip_data,
                a.equip_observacao, a.loc_id, b.loc_razaoSocial 
            from 
                equipamento a, localizacao b 
            where 
                a.loc_id = b.loc_id;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const equipamento = await db.query(sql); 
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento.', 
                dados: equipamento[0], 
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
            const { equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id } = request.body;

            // instrução SQL
            const sql = `INSERT INTO equipamento (equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const equip_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento cadastrado com sucesso.', 
                dados: equip_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    async editar(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id} = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE equipamento SET equip_nome = ?, equip_modelo = ?, equip_tipo = ?, equip_status = ?, equip_data = ?, equip_observacao = ?, loc_id = ? WHERE equip_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id, equip_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Equipamento ${equip_id} atualizado com sucesso!`, 
                dados: atualizaDados[0].affectedRows 
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na alteração.', 
                dados: error.message
            });
        }
    }, 

    async apagar(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { equip_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM equipamento WHERE equip_id = ?;`;

            // array com parâmetros da exclusão
            const values = [equip_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Equipamento ${equip_id} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}

