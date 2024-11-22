const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listar(request, response) {//ok

        try {   

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 
            
            

            const sql = `SELECT a.equip_id, a.equip_modelo, a.equip_tipo, a.equip_ip, a.equip_mac, a.equip_status, a.equip_observacao, b.local_nome, b.local_descricao
            FROM 
                novo_equipamento a,
                novo_local b, 
                novo_equipamento_local c
            WHERE 
                c.equip_id = a.equip_id
            AND c.local_id = b.local_id
            AND b.cli_id = ?;`;

            // preparo do array com dados que serão atualizados
            const values = [cli_id]; 

            //executa instruções SQL e armazena o resultado na variável usuários
            const equipamento = await db.query(sql, values); 
            const nItens = equipamento[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista equipamentos.', 
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

    async cadastrar(request, response) {//ok
        try {
            // parâmetros recebidos no corpo da requisição
            const { equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao } = request.body;

            // instrução SQL
            const sql = `INSERT INTO novo_equipamento (equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao) VALUES (?, ?, ?, ?, ?, ?)`;

            // definição dos dados a serem inseridos em um array
            const values = [equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao];  

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

    // async editar(request, response) { //ok
    //     try {
    //         // parâmetros recebidos pelo corpo da requisição
    //         const { equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao} = request.body;

    //         // parâmetro recebido pela URL via params ex: /usuario/1
    //         const { equip_id } = request.params; 

    //         // instruções SQL
    //         const sql = `UPDATE novo_equipamento SET equip_modelo = ?, equip_tipo = ?, equip_ip = ?, equip_mac = ?, equip_status = ?, equip_observacao = ? WHERE equip_id = ?;`; 

    //         // preparo do array com dados que serão atualizados
    //         const values = [equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao, equip_id]; 

    //         // execução e obtenção de confirmação da atualização realizada
    //         const atualizaDados = await db.query(sql, values); 
            
    //         return response.status(200).json({
    //             sucesso: true, 
    //             mensagem: `Equipamento ${equip_id} atualizado com sucesso!`, 
    //             dados: atualizaDados[0].affectedRows 
    //         });

    //     } catch (error) {
    //         return response.status(500).json({
    //             sucesso: false, 
    //             mensagem: 'Erro na alteração.', 
    //             dados: error.message
    //         });
    //     }
    // }, 


    //NAO SERA POSSIVEL APAGAR INFORMACOES DA TABELA. APENAS EDICAO.
    async apagar(request, response) { //ok
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
            const { cli_id } = request.params; 
            console.log('Parametro cli_id:', cli_id);  // Verifique o cli_id
    
            const sql = `SELECT a.local_id, a.equip_id, b.local_nome, b.local_descricao, c.equip_modelo, c.equip_observacao
                        FROM
                            novo_equipamento_local a,
                            novo_local b,
                            novo_equipamento c  
                        WHERE
                            a.local_id = b.local_id
                        AND a.equip_id = c.equip_id
                        AND b.cli_id = ?;`;
    
            const values = [cli_id]; 
    
            // Chamada para o banco de dados
            const [equipamento] = await db.query(sql, values);  // A alteração aqui foi desestruturar para pegar diretamente o array
    
            console.log('Resultado da query:', equipamento);  // Verifique o resultado da consulta
    
            if (!equipamento || equipamento.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Nenhum equipamento encontrado.',
                    dados: []
                });
            }
    
            const nItens = equipamento.length;
    
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Equipamento listado.', 
                dados: equipamento,  // Dados corretos, sem a necessidade de [0]
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

            // Formata o valor da temperatura para garantir que seja um número inteiro
            if (nItens > 0) {
            equipamento[0][0].dados_temp = Math.round(parseFloat(equipamento[0][0].dados_temp));
            };

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
    },

    //Nova API em teste. Ela realizará o cadastro da localização e do equipamento, e depois vai realizar o vinculo
    async cadastrarEquipamentoELocal(req, res) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
    
            // Validação dos parâmetros recebidos
            const { equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao, local_nome, local_descricao, cli_id } = req.body;
            if (!equip_modelo || !equip_tipo || !equip_ip || !equip_mac || !local_nome || !local_descricao || !cli_id) {
                throw new Error('Campos obrigatórios não preenchidos');
            }
    
            // Verificar duplicação de IP ou MAC
            const sqlVerificarEquipamento = `SELECT * FROM novo_equipamento WHERE equip_ip = ? OR equip_mac = ?`;
            const [equipamentoExistente] = await connection.query(sqlVerificarEquipamento, [equip_ip, equip_mac]);
            if (equipamentoExistente.length > 0) {
                throw new Error('Equipamento com o mesmo IP ou MAC já cadastrado.');
            }
    
            // Inserir local
            const sqlLocal = `INSERT INTO novo_local (local_nome, local_descricao, cli_id) VALUES (?, ?, ?)`;
            const [resultLocal] = await connection.query(sqlLocal, [local_nome, local_descricao, cli_id]);
            const local_id = resultLocal.insertId;
    
            // Inserir equipamento
            const sqlEquipamento = `INSERT INTO novo_equipamento (equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao) VALUES (?, ?, ?, ?, ?, ?)`;
            const [resultEquipamento] = await connection.query(sqlEquipamento, [equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status || 'A', equip_observacao || null]);
            const equip_id = resultEquipamento.insertId;
    
            // Inserir vínculo
            const sqlVinculo = `INSERT INTO novo_equipamento_local (equip_id, local_id) VALUES (?, ?)`;
            await connection.query(sqlVinculo, [equip_id, local_id]);
    
            await connection.commit(); // Commit após todas as operações
    
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Equipamento e local cadastrados com sucesso!',
                dados: { equip_id, local_id }
            });
        } catch (error) {
            await connection.rollback(); // Rollback em caso de erro
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar equipamento e local.',
                dados: error.message
            });
        } finally {
            connection.release();
        }
    
        },

    //Editar o equipamento/Localização cadastrada
    async editar(request, response) {
        const connection = await db.getConnection(); // Para garantir atomicidade na transação
        try {
            await connection.beginTransaction();
    
            // parâmetros recebidos pelo corpo da requisição
            const { equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao, local_nome, local_descricao } = request.body;
    
            // parâmetro recebido pela URL via params
            const { equip_id } = request.params;
    
            // 1. Atualizar o equipamento
            const sqlEquipamento = `UPDATE novo_equipamento 
                                    SET equip_modelo = ?, equip_tipo = ?, equip_ip = ?, equip_mac = ?, equip_status = ?, equip_observacao = ? 
                                    WHERE equip_id = ?;`;
    
            const valuesEquipamento = [equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao, equip_id];
            const resultEquipamento = await connection.query(sqlEquipamento, valuesEquipamento);
    
            if (resultEquipamento[0].affectedRows === 0) {
                throw new Error('Nenhum equipamento foi atualizado. Verifique se o ID está correto.');
            }
    
            // 2. Atualizar a localização, se os dados de localização forem fornecidos
            let resultLocalizacao;
            if (local_nome && local_descricao) {
                const sqlAtualizarLocalizacao = `UPDATE novo_local l
                                                 JOIN novo_equipamento_local el ON l.local_id = el.local_id
                                                 SET l.local_nome = ?, l.local_descricao = ?
                                                 WHERE el.equip_id = ?;`;
    
                const valuesLocalizacao = [local_nome, local_descricao, equip_id];
                resultLocalizacao = await connection.query(sqlAtualizarLocalizacao, valuesLocalizacao);
    
                if (resultLocalizacao[0].affectedRows === 0) {
                    throw new Error('Nenhuma localização foi atualizada. Verifique se o equipamento está vinculado a uma localização.');
                }
            }
    
            await connection.commit(); // Finaliza a transação
    
            // Retorne os dados atualizados
            const updatedData = {
                equip_modelo, 
                equip_tipo, 
                equip_ip, 
                equip_mac, 
                equip_status, 
                equip_observacao,
                local_nome,
                local_descricao
            };
    
            return response.status(200).json({
                sucesso: true,
                mensagem: `Equipamento e localização ${equip_id} atualizados com sucesso!`,
                dados: updatedData
            });
    
        } catch (error) {
            await connection.rollback(); // Em caso de erro, desfaz a transação
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar o equipamento e localização.',
                dados: error.message
            });
        } finally {
            connection.release(); // Libera a conexão do pool
        }
    }
    

}

