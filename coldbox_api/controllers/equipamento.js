const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {
        try {
            // instrução SQL com INNER JOIN para unir as tabelas "equipamento" e "dados"
            const sql = `SELECT 
                            a.equip_id, 
                            a.equip_modelo, 
                            a.equip_tipo,
                            a.equip_ip,
                            a.equip_mac,
                            a.equip_status, 
                            a.equip_observacao, 
                            a.loc_id, 
                            b.loc_razaoSocial,
                            d.dados_temp,
                            d.dados_umid,
                            d.dados_data
                    FROM 
                        novo_equipamento a
                    INNER JOIN
                        localizacao b ON a.loc_id = b.loc_id
                    INNER JOIN
                        dados d ON a.equip_id = d.equip_id
                    WHERE
                        d.dados_data = (
                            SELECT MAX(d2.dados_data)
                            FROM dados d2
                            WHERE d2.equip_id = d.equip_id
                        );`; //Finalizando com um consulta para que o mesmo equip_id somente apareça uma vez mostrando o dado mais recente


            //executa instruções SQL e armazena o resultado na variável usuários
            const equipamento = await db.query(sql); 
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento.', 
                dados: equipamento[0], 
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
            const { equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id } = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_equipamento (equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id];  

            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values); 

            //identificação do ID do registro inserido
            const equip_id = execSql[0].insertId;           

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento cadastrado com sucesso.', 
                dados: equip_id
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
            const { equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id} = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE novo_equipamento SET equip_nome = ?, equip_modelo = ?, equip_tipo = ?, equip_status = ?, equip_data = ?, equip_observacao = ?, loc_id = ? WHERE equip_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_nome, equip_modelo, equip_tipo, equip_status, equip_data, equip_observacao, loc_id, equip_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Equipamento ${equip_id} atualizado com sucesso!`, 
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
            const { equip_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM novo_equipamento WHERE equip_id = ?;`;

            // array com parâmetros da exclusão
            const values = [equip_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Equipamento ${equip_id} excluído com sucesso`,
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

    //traz os equipamentos da empresa
    async listarDadosEquipamentoEmpresa(request, response) {
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL
            const sql = `SELECT a.local_id, a.equip_id, b.local_nome, b.local_descricao, c.equip_modelo, c.equip_observacao
            FROM
                novo_equipamento_local a,
                novo_local b,
                novo_equipamento c  
            WHERE
                a.local_id = b.local_id
            AND a.equip_id = c.equip_id
            AND b.cli_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [cli_id]; 

            //executa a query
            const equipamento = await db.query(sql, values); 
            console.log('Resultado da query:', equipamento);

            //verifica se ha dados retornados
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento.', 
                dados: equipamento[0], 
                nItens                 
            });

        } catch (error) {
            console.error('Erro na função listarDadosEquipamentoEmpresa:', error.message);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    },

    //traz a ultima comunicacao com o equipamento
    async listarDadosUltimaComunicacao(request, response) {
        try {

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { equip_id } = request.params; 

            // instruções SQL
            const sql = `SELECT * FROM novo_equipamento_dados WHERE equip_id = ? ORDER BY dados_data DESC LIMIT 1;`; 

            // preparo do array com dados que serão atualizados
            const values = [equip_id]; 

            //executa a query
            const equipamento = await db.query(sql, values); 
            console.log('Resultado da query:', equipamento);

            //verifica se ha dados retornados
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Ultimas informacoes do equipamento.', 
                dados: equipamento[0], 
                nItens                 
            });

        } catch (error) {
            console.error('Erro na função listarDadosUltimaComunicacao:', error.message);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }


}

