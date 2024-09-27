select * from novo_alerta; /*ok*/
select * from novo_clientes; /*ok*/
select * from novo_equipamento;/*ok*/
select * from novo_local;/*ok*/
select * from novo_nivel_acesso;
select * from novo_usuario;

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados order by dados_id desc;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

/*novo lista dados*/
SELECT a.dados_id, c.local_nome, b.equip_modelo, b.equip_tipo, a.dados_temp, a.dados_umid, a.dados_data
FROM 
	novo_equipamento_dados a,
	novo_equipamento b,
    novo_local c,
    novo_equipamento_local d    
WHERE
	a.equip_id = b.equip_id
AND a.equip_id = d.equip_id
AND d.local_id = c.local_id
AND b.equip_id = 5;


/*lista dados*/
SELECT a.dados_id, b.equip_modelo, b.equip_tipo, a.dados_temp, a.dados_umid, a.dados_data
FROM 
	novo_equipamento_dados a,
	novo_equipamento b
WHERE
	a.equip_id = b.equip_id
AND b.equip_id = 1;

/*cadastar dados*/
INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id) VALUES (?, ?, ?);