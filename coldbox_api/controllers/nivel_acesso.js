const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select nivel_id, nivel_acesso, nivel_descricao from nivel_acesso;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const nivel = await db.query(sql); 
            const nItens = nivel[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Niveis de acesso.', 
                dados: nivel[0], 
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
            const { nivel_acesso, nivel_descricao } = request.body;

            // instrução SQL
            const sql = `INSERT INTO nivel_acesso (nivel_acesso, nivel_descricao) VALUES (?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [nivel_acesso, nivel_descricao];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const nivel_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Nivel de acesso cadastrado com sucesso.', 
                dados: nivel_id
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
            const { nivel_acesso, nivel_descricao } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { nivel_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE nivel_acesso SET nivel_acesso = ?, nivel_descricao = ? WHERE nivel_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [nivel_acesso, nivel_descricao, nivel_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Nivel de acesso ${nivel_id} atualizado com sucesso!`, 
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
            const { nivel_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM nivel_acesso WHERE nivel_id = ?;`;

            // array com parâmetros da exclusão
            const values = [nivel_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Nivel de acesso ${nivel_id} excluído com sucesso`,
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

