SELECT * FROM novo_equipamento_dados;
SELECT * FROM novo_equipamento;
SELECT * FROM novo_equipamento_parametro2;
SELECT * FROM novo_equipamento_alertas_enviados;
SELECT * FROM novo_alerta;
SELECT * FROM novo_usuario;



/*listar*/
SELECT *
FROM 
    novo_equipamento_alertas_enviados a,
    novo_equipamento b,
    novo_alerta c,
    novo_equipamento_dados d,
    novo_usuario e
WHERE
	a.equip_id = b.equip_id
AND a.alerta_id = c.alerta_id
AND a.dados_id = d.dados_id
AND a.alertEnviado_usuario_retorno = e.user_id;

/*cadastrar*/
INSERT INTO novo_equipamento_parametro2 (param_interface, param_maximo, param_minimo, equip_id) VALUES (?, ?, ?, ?);

/*editar*/
UPDATE novo_equipamento_parametro2 SET param_interface = ?, param_maximo = ?, param_minimo = ?, equip_id = ? WHERE param_id = ?;

/*apagar*/
DELETE FROM novo_equipamento_parametro2 WHERE param_id = ?;