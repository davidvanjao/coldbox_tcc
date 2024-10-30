const { json } = require('express'); 
const db = require('../database/connection'); 
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

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
            if(!errors.isEmpty()) {
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
    async enviarEmailRecuperacao(req, res) {
        const { email } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'henrique.prodam@hotmail.com',
                pass: '123'
            }
        });

        const resetUrl = `http://127.0.0.1:3333/redefinirSenha?email=${encodeURIComponent(email)}`;
        const mailOptions = {
            from: 'henrique.prodam@hotmail.com',
            to: email,
            subject: 'Redefinição de senha',
            text: `Clique no link para redefinir sua senha: ${resetUrl}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail enviado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao enviar o e-mail', error });
        }
    },
    // Função para redefinir a senha do usuário
    async redefinirSenha(req, res) {
        const { email, password } = req.body; // Recebe o email e a nova senha do corpo da requisição
    
        try {
            // Verifica se o usuário existe com base no email
            const sqlVerificaUsuario = `SELECT user_id FROM novo_usuario WHERE user_email = ?;`;
            const usuario = await db.query(sqlVerificaUsuario, [email]);
    
            if (usuario[0].length === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado.',
                });
            }
    
            // Hash da nova senha
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Atualiza a senha do usuário
            const sqlAtualizaSenha = `UPDATE novo_usuario SET user_senha = ? WHERE user_email = ?;`;
            await db.query(sqlAtualizaSenha, [hashedPassword, email]);
    
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Senha redefinida com sucesso.',
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao redefinir a senha.',
                dados: error.message,
            });
        }
    }
    };

