const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) { //ok 25-09
        try {
            // instruções SQL
            const sql = `SELECT * FROM NOVO_ALERTA;;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const alerta = await db.query(sql); 
            const nItens = alerta[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'LISTA DE ALERTAS.', 
                dados: alerta[0], 
                nItens                 
            });

        } catch (error) {
            //console.log(error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'ERRO NA REQUISICAO DO ALERTA.', 
                dados: error.message
            });
        }
    },

    async cadastrar(request, response) { //ok 25-09
        try {
            // parâmetros recebidos no corpo da requisição
            const { alerta_tipo, alerta_descricao } = request.body;

            // instrução SQL
            const sql = `INSERT INTO NOVO_ALERTA (ALERTA_TIPO, ALERTA_DESCRICAO) VALUES (?, ?);`;

            // definição dos dados a serem inseridos em um array
            const values = [alerta_tipo, alerta_descricao];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const alerta_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alerta cadastrado com sucesso.', 
                dados: alerta_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    async editar(request, response) { //ok 25-09
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { alerta_tipo, alerta_descricao } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { alerta_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE NOVO_ALERTA SET ALERTA_TIPO = ?, ALERTA_DESCRICAO = ? WHERE ALERTA_ID = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [alerta_tipo, alerta_descricao, alerta_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Alerta ${alerta_id} atualizado com sucesso!`, 
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

    async apagar(request, response) { // ok 25-09
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { alerta_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM NOVO_ALERTA WHERE ALERTA_ID = ?;`;

            // array com parâmetros da exclusão
            const values = [alerta_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Alerta ${alerta_id} excluído com sucesso`,
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

