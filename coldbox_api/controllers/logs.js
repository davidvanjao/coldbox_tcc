const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instruções SQL
            const sql = `select a.logs_id, a.log_data, a.equip_id, b.equip_nome, a.alerta_id, c.alerta_tipo, a.user_id, d.user_nome, a.log_status, a.log_retorno
            from 
                logs a,
                equipamento b,
                alerta c,
                usuario d
            where 
                a.equip_id = b.equip_id
            and a.alerta_id = c.alerta_id
            and a.user_id = d.user_id;`; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const logs = await db.query(sql); 
            const nItens = logs[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Logs.', 
                dados: logs[0], 
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
            const { log_data, equip_id, alerta_id, user_id, log_status, log_retorno } = request.body;

            // instrução SQL
            const sql = `INSERT INTO logs (log_data, equip_id, alerta_id, user_id, log_status, log_retorno) VALUES (?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [log_data, equip_id, alerta_id, user_id, log_status, log_retorno];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const logs_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Log cadastrado com sucesso.', 
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
            const { log_data, equip_id, alerta_id, user_id, log_status, log_retorno } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { logs_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE logs SET log_data = ?, equip_id = ?, alerta_id = ?, user_id = ?, log_status = ?, log_retorno = ? 
            WHERE logs_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [log_data, equip_id, alerta_id, user_id, log_status, log_retorno, logs_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Log ${logs_id} atualizado com sucesso!`, 
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

    //traz o total de notificacoes que nao foram visualizadas - ok
    async listarNotificacoesTotalEmAberto(request, response) {
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `SELECT COUNT(alertEnviado_status) as notificacao FROM novo_equipamento_alertas_enviados WHERE equip_id = ? AND alertEnviado_usuario_retorno IS NULL;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_id]; 

            //executa a query
            const equipamento = await db.query(sql, values); 
            console.log('Resultado da query:', equipamento);

            //verifica se ha dados retornados
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Notificações em aberto.', 
                dados: equipamento[0], 
                nItens                 
            });

        } catch (error) {
            console.error('Erro na função listarNotificacoesEmAberto:', error.message);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    //traz as notificacoes que nao foram visualizadas - ok
    async listarNotificacoesNaoVisualizadas(request, response) {
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `SELECT A.alertEnviado_id, A.alertEnviado_data, C.alerta_tipo, D.dados_temp, A.alertEnviado_status, A.alertEnviado_usuario_retorno
            FROM 
                novo_equipamento_alertas_enviados A,
                novo_equipamento B,
                novo_alerta C,
                novo_equipamento_dados D    
            WHERE 
                A.equip_id = ? 
            AND A.equip_id = B.equip_id
            AND A.alerta_id = C.alerta_id
            AND A.dados_id = D.dados_id
            AND alertEnviado_usuario_retorno IS NULL;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_id]; 

            //executa a query
            const equipamento = await db.query(sql, values); 
            console.log('Resultado da query:', equipamento);

            //verifica se ha dados retornados
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Notificações em aberto.', 
                dados: equipamento[0], 
                nItens                 
            });

        } catch (error) {
            console.error('Erro na função listarNotificacoesEmAberto:', error.message);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }

}

