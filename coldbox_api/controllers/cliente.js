const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {// ok
        try {

            //parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL
            const sql = `SELECT * FROM NOVO_CLIENTES WHERE CLI_ID = ?`; 

            // preparo do array com dados que serão atualizados
            const values = [cli_id];    

            //executa instruções SQL e armazena o resultado na variável usuários
            const cliente = await db.query(sql, values); 
            const nItens = alerta[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'LISTA DE CLIENTES.', 
                dados: cliente[0], 
                nItens                 
            });

        } catch (error) {
            //console.log(error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'ERRO NA REQUISICAO DO CLIENTE.', 
                dados: error.message
            });
        }
    },

    async cadastrar(request, response) {//OK
        try {
            // parâmetros recebidos no corpo da requisição
            const { cli_razaoSocial, cli_endereco, cli_cidade, cli_estado, cli_contrato } = request.body;

            // instrução SQL
            const sql = `INSERT INTO NOVO_CLIENTES (cli_razaoSocial, cli_endereco, cli_cidade, cli_estado, cli_contrato) VALUES (?, ?, ?, ?, ?);`;

            // definição dos dados a serem inseridos em um array
            const values = [cli_razaoSocial, cli_endereco, cli_cidade, cli_estado, cli_contrato];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const alerta_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'CLIENTE cadastrado com sucesso.', 
                dados: alerta_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro NO CADASTRO DO CLIENTE.', 
                dados: error.message
            });
        }
    },

    async editar(request, response) {//ok
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { cli_razaoSocial, cli_endereco, cli_cidade, cli_estado, cli_contrato } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE NOVO_CLIENTES SET cli_razaoSocial = ?, cli_endereco = ?, cli_cidade = ?, cli_estado = ?, cli_contrato = ? WHERE cli_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [cli_razaoSocial, cli_endereco, cli_cidade, cli_estado, cli_contrato, cli_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Cliente ${cli_id} atualizado com sucesso!`, 
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

}

