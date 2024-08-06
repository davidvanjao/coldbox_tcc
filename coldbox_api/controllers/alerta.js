const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select alerta_id, alerta_tipo, alerta_descri from alerta;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const alerta = await db.query(sql); 
            const nItens = alerta[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alertas.', 
                dados: alerta[0], 
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
            const { alerta_tipo, alerta_descri } = request.body;

            // instrução SQL
            const sql = `INSERT INTO alerta (alerta_tipo, alerta_descri) VALUES (?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [alerta_tipo, alerta_descri];  

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

    async editar(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { alerta_tipo, alerta_descri } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { alerta_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE alerta SET alerta_tipo = ?, alerta_descri = ? WHERE alerta_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [alerta_tipo, alerta_descri, alerta_id]; 

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

    async apagar(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { alerta_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM alerta WHERE alerta_id = ?;`;

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

