SELECT * FROM novo_equipamento_dados;
SELECT * FROM novo_equipamento;
SELECT * FROM novo_equipamento_parametro2;
SELECT * FROM novo_equipamento_alertas_enviados;
SELECT * FROM novo_alerta;
SELECT * FROM novo_usuario;
SELECT * FROM novo_local;
SELECT * FROM novo_equipamento_local;



/*listar*/
SELECT a.alerta_id, a.alertEnviado_status, c.alerta_tipo,  a.alertEnviado_usuario_retorno, c.alerta_descricao, d.dados_temp
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
AND a.alertEnviado_status != 'ENVIADO'
#AND a.alertEnviado_usuario_retorno = e.user_id
AND a.equip_id = '1';

/*cadastrar*/
INSERT INTO novo_equipamento_alertas_enviados (equip_id, alerta_id, dados_id, alertaEnviado_status) VALUES (?, ?, ?, ?);

/*editar*/
UPDATE novo_equipamento_alertas_enviados SET alertEnviado_status = ?, alertEnviado_usuario_retorno = ? WHERE alertEnviado_id = ?;

/*apagar*/
DELETE FROM novo_equipamento_parametro2 WHERE param_id = ?;