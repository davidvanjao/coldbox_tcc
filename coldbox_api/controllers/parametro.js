const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select a.param_id, a.equip_id, b.equip_nome, b.equip_tipo, a.param_tipo, a.param_valor, a.alerta_id, c.alerta_tipo
            from 
                parametro_alerta a,
                equipamento b,
                alerta c
            where
            a.equip_id = b.equip_id
            and a.alerta_id = c.alerta_id;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const parametro = await db.query(sql); 
            const nItens = parametro[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Parametro.', 
                dados: parametro[0], 
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
            const { equip_id, param_tipo, param_valor, alerta_id } = request.body;

            // instrução SQL
            const sql = `INSERT INTO parametro_alerta (equip_id, param_tipo, param_valor, alerta_id) VALUES (?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_id, param_tipo, param_valor, alerta_id];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const param_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Parametro cadastrado com sucesso.', 
                dados: param_id
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
            const {equip_id, param_tipo, param_valor, alerta_id} = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { param_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE parametro_alerta SET equip_id = ?, param_tipo = ?, param_valor = ?, alerta_id = ? WHERE param_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_id, param_tipo, param_valor, alerta_id, param_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Parametro ${param_id} atualizado com sucesso!`, 
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
            const { param_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM parametro_alerta WHERE param_id = ?;`;

            // array com parâmetros da exclusão
            const values = [param_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Parametro ${param_id} excluído com sucesso`,
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

