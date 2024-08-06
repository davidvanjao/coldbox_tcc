const { json } = require('express'); 
const db = require('../database/connection'); 
const { validationResult } = require('express-validator');



module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select user_id, user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid from usuario;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql); 
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de usuários.', 
                dados: usuarios[0], 
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

            const errors = validationResult(request);

            if(!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array()[0]['msg']});
            }


            // parâmetros recebidos no corpo da requisição
            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid } = request.body;

            // instrução SQL
            const sql = `INSERT INTO usuario
                (user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid) 
                VALUES (?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            // identificação do ID do registro inserido
            const usu_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de usuário efetuado com sucesso.', 
                dados: usu_id
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
            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { user_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE usuario SET user_nome = ?, user_senha = ?,
            user_email = ?, user_tel = ?, nivel_id = ?, user_priorid = ?
            WHERE user_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [user_nome, user_senha, user_email, user_tel, nivel_id, user_priorid, user_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${user_id} atualizado com sucesso!`, 
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
            const { user_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM usuario WHERE user_id = ?;`;

            // array com parâmetros da exclusão
            const values = [user_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${user_id} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async login(request, response) {
        try {

            const {user_email, user_senha} = request.body;

            // instruções SQL
            const sql = `select user_id, user_nome, user_tel, nivel_id, user_priorid from usuario where user_email = ? and user_senha = ?;`; 

            const values = [user_email, user_senha];

            //executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql, values); 
            const nItens = usuarios[0].length;

            console.log(usuarios[0]);

            if(nItens < 1) {

                return response.status(403).json({
                    sucesso: false, 
                    mensagem: 'Login e/ou senha inválido.', 
                    dados: null               
                });

            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Login efetuado com sucesso.', 
                dados: usuarios[0]            
            });

        } catch (error) {
            //console.log(error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }
}

