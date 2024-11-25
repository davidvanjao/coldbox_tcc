const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {//ok
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `SELECT a.alerta_id, a.alertEnviado_status, c.alerta_id, c.alerta_tipo,  a.alertEnviado_usuario_retorno, c.alerta_descricao, d.dados_temp
            FROM 
                novo_equipamento_alertas_enviados a,
                novo_equipamento b,
                novo_alerta c,
                novo_equipamento_dados d
                #novo_usuario e
            WHERE
                a.equip_id = b.equip_id
            AND a.alerta_id = c.alerta_id
            AND a.dados_id = d.dados_id
            AND a.alertEnviado_status = 'ENVIADO'
            #AND a.alertEnviado_usuario_retorno = e.user_id
            AND a.equip_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_id]; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const logs = await db.query(sql, values); 
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

    async cadastrar(request, response) {//ok
        try {
            // parâmetros recebidos no corpo da requisição
            const { equip_id, alerta_id, dados_id} = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_equipamento_alertas_enviados (equip_id, alerta_id, dados_id) VALUES (?, ?, ?);`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_id, alerta_id, dados_id];  

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

    async editar(request, response) {//ok
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { alertEnviado_status, alertEnviado_usuario_retorno } = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { alertEnviado_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE novo_equipamento_alertas_enviados SET alertEnviado_status = ?, alertEnviado_usuario_retorno = ? WHERE alertEnviado_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [alertEnviado_status, alertEnviado_usuario_retorno, alertEnviado_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Log ${alertEnviado_id} atualizado com sucesso!`, 
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

    //traz o total de notificacoes que nao foram visualizadas - 
    async listarNotificacoesTotalEmAberto(request, response) { //ok
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
    async listarNotificacoesNaoVisualizadas(request, response) { //ok
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `SELECT A.alertEnviado_id, A.alertEnviado_data, D.dados_data, C.alerta_tipo, D.dados_temp, A.alertEnviado_status, A.alertEnviado_usuario_retorno, A.local_nome -- ADICIONADO EQUIP_ID
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
    },


    //API PARA O ALERTAS WEB
    async listarNotificacoesNaoVisualizadasWEB(request, response) {
        try {
            const { equip_id } = request.params;
    
            const sql = `
                SELECT 
                    A.alertEnviado_id, 
                    A.alertEnviado_data, 
                    D.dados_data, 
                    C.alerta_tipo, 
                    D.dados_temp, 
                    A.alertEnviado_status, 
                    A.alertEnviado_usuario_retorno,
                    L.local_nome -- Nome do local
                FROM 
                    novo_equipamento_alertas_enviados A
                JOIN 
                    novo_equipamento_dados D ON A.dados_id = D.dados_id
                JOIN 
                    novo_alerta C ON A.alerta_id = C.alerta_id
                JOIN 
                    novo_equipamento_local EL ON A.equip_id = EL.equip_id -- Relaciona com novo_equipamento_local
                JOIN 
                    novo_local L ON EL.local_id = L.local_id -- Relaciona com novo_local
                WHERE 
                    A.equip_id = ? 
                AND 
                    A.alertEnviado_status = 'ENVIADO'
                AND 
                    A.alertEnviado_usuario_retorno IS NULL;
            `;
    
            const values = [equip_id];
    
            const equipamento = await db.query(sql, values);
    
            const nItens = equipamento[0].length;
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Notificações em aberto.',
                dados: equipamento[0],
                nItens
            });
        } catch (error) {
            console.error('Erro na função listarNotificacoesNaoVisualizadas:', error.message);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarWeb(request, response) {
        try {
            const { alertEnviado_status, alertEnviado_usuario_retorno } = request.body;
            const { alertEnviado_id } = request.params;
    
            const sql = `
                UPDATE novo_equipamento_alertas_enviados
                SET alertEnviado_status = ?, alertEnviado_usuario_retorno = ?
                WHERE alertEnviado_id = ?;
            `;
    
            const values = [alertEnviado_status, alertEnviado_usuario_retorno, alertEnviado_id];
    
            const result = await db.query(sql, values);
    
            if (result[0].affectedRows > 0) {
                return response.status(200).json({
                    sucesso: true,
                    mensagem: `Log ${alertEnviado_id} atualizado com sucesso!`
                });
            } else {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Alerta não encontrado.'
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar o alerta:', error.message);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na atualização do alerta.',
                dados: error.message
            });
        }
    }
    
    
    
    
}

