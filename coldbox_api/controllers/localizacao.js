const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select loc_id, loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas from localizacao;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const localizacao = await db.query(sql); 
            const nItens = localizacao[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Localização.', 
                dados: localizacao[0], 
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
            const { loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas } = request.body;

            // instrução SQL
            const sql = `INSERT INTO localizacao (loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const loc_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Localização cadastrado com sucesso.', 
                dados: loc_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    //nao esta funcionando
    async editar(request, response) {

        try {
            // parâmetros recebidos pelo corpo da requisição
            const { loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { loc_id } = request.params; 
            console.log(loc_id)

            // instruções SQL
            const sql = `UPDATE localizacao SET loc_razaoSocial = ?, loc_endereco = ?, loc_cidade = ?, loc_estado = ?, loc_contrato = ?, loc_data = ?, loc_notas = ? WHERE loc_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [loc_razaoSocial, loc_endereco, loc_cidade, loc_estado, loc_contrato, loc_data, loc_notas, loc_id]; 

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

    async apagar(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { loc_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM localizacao WHERE loc_id = ?;`;

            // array com parâmetros da exclusão
            const values = [loc_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Localizacao ${loc_id} excluído com sucesso`,
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