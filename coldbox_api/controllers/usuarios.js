const { json } = require('express'); 
const db = require('../database/connection'); 
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Certifique-se de que bcrypt está instalado

module.exports = {
    // Função para listar usuários por `cli_id`
    async listar(request, response) {
        try {
            const { cli_id } = request.params; 
            const sql = `SELECT * FROM novo_usuario WHERE cli_id = ?;`; 
            const usuarios = await db.query(sql, [cli_id]);
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de usuários da empresa', 
                dados: usuarios[0], 
                nItens                 
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    // Função para cadastrar um novo usuário
    async cadastrar(request, response) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array()[0]['msg'] });
            }

            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id } = request.body;
            const sql = `INSERT INTO novo_usuario (user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const execSql = await db.query(sql, [user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id]);
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

    // Função para editar informações de um usuário
    async editar(request, response) {
        try {
            const { user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, user_status } = request.body;
            const { user_id } = request.params; 
            const sql = `UPDATE novo_usuario SET user_nome = ?, user_senha = ?, user_email = ?, user_tel = ?, nivel_id = ?, user_imagem_perfil = ?, user_status = ? WHERE user_id = ?;`; 
            const atualizaDados = await db.query(sql, [user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, user_status, user_id]);

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

    // Função para apagar um usuário
    async apagar(request, response) {
        try {
            const { user_id } = request.params;
            const sql = `DELETE FROM novo_usuario WHERE user_id = ?;`;
            const excluir = await db.query(sql, [user_id]);

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

    // Função para login do usuário
    async login(request, response) {
        try {
            const { user_email, user_senha } = request.body;
            const sql = `SELECT user_id, user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil FROM novo_usuario WHERE user_email = ? AND user_senha = ?;`; 
            const usuarios = await db.query(sql, [user_email, user_senha]);
            const nItens = usuarios[0].length;
            
            if (nItens < 1) {
                return response.status(200).json({
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
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    // Função para listar dados do usuário e empresa
    async listarDadosUsuarioEmpresa(request, response) {
        try {
            const { user_id } = request.params; 
            const sql = `SELECT a.user_id, a.user_nome, b.cli_id, b.cli_razaoSocial, c.nivel_acesso
                         FROM novo_usuario a, novo_clientes b, novo_nivel_acesso c
                         WHERE a.user_id = ? AND a.cli_id = b.cli_id AND a.nivel_id = c.nivel_id;`; 
            const usuario = await db.query(sql, [user_id]);
            const nItens = usuario[0].length;

            if (nItens < 1) {
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
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    // Função para listar dados do usuário pelo ID
    async listarDadosUsuario(request, response) {
        const { user_id } = request.params;
    
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
                dados: result[0],
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao buscar o usuário',
                dados: error.message,
            });
        }
    },

    // Função para enviar e-mail de recuperação de senha
    async enviarEmailRecuperacao(request, response) {
        try {
            const { user_email } = request.body;
            const sql = `SELECT user_id, user_nome FROM novo_usuario WHERE user_email = ?;`;
            const values = [user_email];
            const result = await db.query(sql, values);

            if (result[0].length === 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email inválido.',
                });
            }

            const user_id = result[0][0].user_id;
            const user_nome = result[0][0].user_nome;

            const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "dc5526bf72b600",
                    pass: "51102710f933a6",
                },
            });

            // Configurações do conteúdo do e-mail
            let message = {
                from: 'dc5526bf72b600@sandbox.smtp.mailtrap.io',
                to: user_email,
                subject: "Conta ativada.",
                text: `Olá ${user_nome}, \nSejam bem-vindos ao Coldbox. Por favor, copie o link nessa mensagem e o cole na barra de pesquisa do navegador. \nVocê será direcionado automaticamente para a pagina de autenticação de cadastro. \nhttp://127.0.0.1:3333/ativacao/usuarios${user_id}`,
                html: `<div>
                <h1>Ativação de Conta</h1>
                <h2>Olá ${user_nome},</h2>
                <p>Sejam bem-vindos ao Coldbox. Por favor, clique no link a seguir </p>
                <a href=http://127.0.0.1:3333/ativacao/usuarios${user_id}>Ativar Conta</a>
                </div>`
            };    

            // Envio do e-mail
            await transporter.sendMail(message);
            
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Email enviado com sucesso.',
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro no envio do e-mail.',
                dados: error.message
            });
        }
    }
};
