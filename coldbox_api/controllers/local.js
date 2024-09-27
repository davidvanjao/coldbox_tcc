const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {//ok
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL
            const sql = `SELECT * FROM novo_local WHERE cli_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [cli_id]; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const local = await db.query(sql, values); 
            const nItens = local[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Local.', 
                dados: local[0], 
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
            const { local_nome, local_descricao, cli_id } = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_local (local_nome, local_descricao, cli_id) VALUES (?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [local_nome, local_descricao, cli_id];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const local_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Parametro cadastrado com sucesso.', 
                dados: local_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    async editar(request, response) { //ok

        try {
            // parâmetros recebidos pelo corpo da requisição
            const { local_nome, local_descricao, cli_id } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { loc_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE novo_local SET local_nome = ?, local_descricao = ?, cli_id = ? WHERE local_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [local_nome, local_descricao, cli_id, loc_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Localização ${loc_id} atualizado com sucesso!`, 
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

    async apagar(request, response) { //ok
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { local_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM novo_local WHERE local_id = ?;`;

            // array com parâmetros da exclusão
            const values = [local_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Localizacao ${local_id} excluído com sucesso`,
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