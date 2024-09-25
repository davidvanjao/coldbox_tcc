select * from novo_clientes;
select * from novo_alerta;
select * from novo_equipamento;
select * from novo_local;
select * from novo_nivel_acesso;
select * from novo_usuario;

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados order by dados_id desc;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro;/*parametros definidos para cada equipamento*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/


/*codigo arduino*/
INSERT INTO novo_equipamento_dados (dados_temp, equip_id) VALUES (?, ?)

/*traz usuario e razao social*/
SELECT a.user_id, a.user_nome,  b.cli_id, b.cli_razaoSocial, c.nivel_acesso
FROM 
	novo_usuario a,
    novo_clientes b,
    novo_nivel_acesso c
WHERE 
	a.user_id = '3'
AND a.cli_id = b.cli_id
AND a.nivel_id = c.nivel_id;

/*traz equipamentos*/
SELECT a.local_id, a.equip_id, b.local_nome, b.local_descricao, c.equip_modelo, c.equip_observacao
FROM
	novo_equipamento_local a,
    novo_local b,
    novo_equipamento c  
WHERE
	a.local_id = b.local_id
AND a.equip_id = c.equip_id
AND b.cli_id = '1';

/*traz a ultima comunicacao do equipamento*/
SELECT * FROM novo_equipamento_dados WHERE equip_id = '2' ORDER BY dados_data DESC LIMIT 1;

/*traz parametros cadastrados por equipamento*/
SELECT * FROM novo_equipamento_parametro2 A, novo_equipamento B WHERE A.equip_id = b.equip_id;

/*cadastrar novo parametro*/
INSERT INTO novo_equipamento_parametro2 (param_interface, param_maximo, param_minimo, equip_id) VALUES (?, ?, ?, ?);

/*traz total notificacoes enviadas e nao atendidas*/
SELECT COUNT(alertEnviado_status) as notificacao FROM novo_equipamento_alertas_enviados WHERE equip_id = '1' AND alertEnviado_usuario_retorno IS NULL;

/*traz notificacoes enviadas e nao atendidas*/
SELECT A.alertEnviado_id, A.alertEnviado_data, C.alerta_tipo, D.dados_temp, A.alertEnviado_status, A.alertEnviado_usuario_retorno
FROM 
	novo_equipamento_alertas_enviados A,
    novo_equipamento B,
    novo_alerta C,
    novo_equipamento_dados D    
WHERE 
	A.equip_id = '1' 
AND A.equip_id = B.equip_id
AND A.alerta_id = C.alerta_id
AND A.dados_id = D.dados_id
AND alertEnviado_usuario_retorno IS NULL;
    