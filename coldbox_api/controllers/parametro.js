const { json } = require('express'); 
const db = require('../database/connection'); 

const moment = require('moment');

const dataInput = (data) => {
    // Converte para o formato americano (aaaa-mm-dd)
    const dataInput = moment(data, 'YYYY/MM/DD').format('DD-MM-YYYY'); 
    return dataInput;
}

module.exports = {
    async listar(request, response) { //ok
        try {

            //parâmetro recebido pela URL via params ex: /usuario/1
            const { cli_id } = request.params; 

            // instruções SQL para buscar todos os parâmetros sem filtro de equip_id
            const sql = `SELECT a.param_id, a.param_interface, a.param_maximo, a.param_minimo, b.equip_id, b.equip_modelo, b.equip_tipo, d.cli_id
            FROM 
                novo_equipamento_parametro2 a,
                novo_equipamento b,
                novo_equipamento_local c,
                novo_local d
            WHERE
                a.equip_id = b.equip_id
            AND b.equip_id = c.equip_id
            AND c.local_id = d.local_id
            AND d.cli_id =?`;

            // preparo do array com dados que serão atualizados
            const values = [cli_id];    
    
            // executa instruções SQL sem parâmetros
            const parametro = await db.query(sql, values); 
            const nItens = parametro[0].length;
    
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Parâmetros', 
                dados: parametro[0], 
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
    

    async cadastrar(request, response) {
        try {
          const { param_interface, param_maximo, param_minimo, equip_id } = request.body;
          const sql = `INSERT INTO novo_equipamento_parametro2 (param_interface, param_maximo, param_minimo, equip_id) VALUES (?, ?, ?, ?);`;
          const values = [param_interface, param_maximo, param_minimo, equip_id];
          const execSql = await db.query(sql, values);
      
          // Busca o registro recém-cadastrado para retorno completo
          const [novoParametro] = await db.query(`SELECT * FROM novo_equipamento_parametro2 WHERE param_id = ?`, [execSql[0].insertId]);
      
          return response.status(200).json({
            sucesso: true,
            mensagem: 'Parâmetro cadastrado com sucesso.',
            dados: novoParametro, // Retorna os dados completos do parâmetro
          });
        } catch (error) {
          return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro no cadastro do parâmetro.',
            dados: error.message,
          });
        }
      },
      
    async editar(request, response) { //ok
        try {
            // parâmetros recebidos pelo corpo da requisição
            const {param_interface, param_maximo, param_minimo, equip_id} = request.body;

            // parâmetro recebido pela URL via params ex: /usuario/1
            const { param_id } = request.params; 

            // instruções SQL
            const sql = `UPDATE novo_equipamento_parametro2 SET param_interface = ?, param_maximo = ?, param_minimo = ?, equip_id = ? WHERE param_id = ?;`; 

            // preparo do array com dados que serão atualizados
            const values = [param_interface, param_maximo, param_minimo, equip_id, param_id]; 

            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Parametro ${param_id} atualizado com sucesso!`, 
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
            const { param_id } = request.params;

            // comando de exclusão
            const sql = `DELETE FROM novo_equipamento_parametro2 WHERE param_id = ?;`;

            // array com parâmetros da exclusão
            const values = [param_id];

            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Parametro ${param_id} excluído com sucesso`,
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

