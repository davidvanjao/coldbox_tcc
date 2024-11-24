const { json } = require('express');
const db = require('../database/connection');
const moment = require('moment');

const dataInput = (data) => {
    const dataInput = moment(data, 'YYYY/MM/DD').format('DD-MM-YYYY');
    return dataInput;
};

module.exports = {
    async listar(request, response) {
        try {
            const { cli_id } = request.params;

            const sql = `SELECT a.param_id, a.param_interface, a.param_maximo, a.param_minimo, b.equip_id, b.equip_modelo, b.equip_tipo, d.cli_id
                         FROM novo_equipamento_parametro2 a
                         JOIN novo_equipamento b ON a.equip_id = b.equip_id
                         JOIN novo_equipamento_local c ON b.equip_id = c.equip_id
                         JOIN novo_local d ON c.local_id = d.local_id
                         WHERE d.cli_id = ?`;

            const values = [cli_id];

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
            const sql = `INSERT INTO novo_equipamento_parametro2 (param_interface, param_maximo, param_minimo, equip_id) VALUES (?, ?, ?, ?)`;
            const values = [param_interface, param_maximo, param_minimo, equip_id];
            const execSql = await db.query(sql, values);

            const [novoParametro] = await db.query(`SELECT * FROM novo_equipamento_parametro2 WHERE param_id = ?`, [execSql[0].insertId]);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Parâmetro cadastrado com sucesso.',
                dados: novoParametro,
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro no cadastro do parâmetro.',
                dados: error.message,
            });
        }
    },

    async editar(request, response) {
        try {
            const { param_interface, param_maximo, param_minimo, equip_id } = request.body;
            const { param_id } = request.params;

            const sql = `UPDATE novo_equipamento_parametro2 SET param_interface = ?, param_maximo = ?, param_minimo = ?, equip_id = ? WHERE param_id = ?`;
            const values = [param_interface, param_maximo, param_minimo, equip_id, param_id];

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

    async apagar(request, response) {
        try {
            const { param_id } = request.params;

            const sql = `DELETE FROM novo_equipamento_parametro2 WHERE param_id = ?`;
            const values = [param_id];

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
};
