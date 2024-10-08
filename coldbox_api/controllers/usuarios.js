const { json } = require('express'); 
const db = require('../database/connection'); 
const { validationResult } = require('express-validator');



module.exports = {
    async listar(request, response) {//ok
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL
            const sql = `select * from novo_usuario WHERE cli_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [cli_id]; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql, values); 
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de usuários da empresa', 
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

    async cadastrar(request, response) { //ok
        try {

            const errors = validationResult(request);

            if(!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array()[0]['msg']});
            }


            // parâmetros recebidos no corpo da requisição
            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id } = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_usuario (user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id];  

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

    async editar(request, response) { //ok
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, user_status} = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { user_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE novo_usuario SET user_nome = ?, user_senha = ?, user_email = ?, user_tel = ?, nivel_id = ?,  user_imagem_perfil = ?, user_status = ? WHERE user_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, user_status, user_id]; 

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

    async apagar(request, response) { //ok
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { user_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM novo_usuario WHERE user_id = ?;`;

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

    //VERIFICA SE USUARIO E SENHA EXISTE - ok
    async login(request, response) { //ok
        try {

            const {user_email, user_senha} = request.body;

            // instruções SQL
            const sql = `select user_id, user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil from novo_usuario where user_email = ? and user_senha = ?;`; 

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
    },
    
    //NOVO - TRAZ NOME DE USUARIO E NOME EMPRESA - ok
    async listarDadosUsuarioEmpresa(request, response) { //ok
        try {

            //const {user_id} = request.body;
            const { user_id } = request.params; 

            // instruções SQL
            const sql = `SELECT a.user_id, a.user_nome,  b.cli_id, b.cli_razaoSocial, c.nivel_acesso
            FROM 
                novo_usuario a,
                novo_clientes b,
                novo_nivel_acesso c
            WHERE 
                a.user_id = ?
            AND a.cli_id = b.cli_id
            AND a.nivel_id = c.nivel_id;`; 

            const values = [user_id];

            //executa instruções SQL e armazena o resultado na variável usuários
            const usuario = await db.query(sql, values); 
            const nItens = usuario[0].length;

            console.log(usuario[0]);

            if(nItens < 1) {

                return response.status(403).json({
                    sucesso: false, 
                    mensagem: 'Dados do usuário inválido.', 
                    dados: null               
                });

            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Sucesso na requisição.', 
                dados: usuario[0]            
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

    //Faz a busca do usuário pelo ID
    async listarDadosUsuario(request, response) {
        const { user_id } = request.params;  // Obtém o ID do usuário a partir dos parâmetros da URL
    
        try {
          const sql = `SELECT * FROM novo_usuario WHERE user_id = ?`;
          const [result] = await db.query(sql, [user_id]);
    
          if (result.length === 0) {
            return response.status(404).json({
              sucesso: false,
              mensagem: 'Usuário não encontrado',
            });
          }
    
          return response.status(200).json({
            sucesso: true,
            dados: result[0], // Retorna os dados do primeiro (e único) usuário encontrado
          });
        } catch (error) {
          return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar o usuário',
            dados: error.message,
          });
        }
    }
}






