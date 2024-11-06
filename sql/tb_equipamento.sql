select * from novo_alerta;
select * from novo_clientes;
select * from novo_equipamento;
select * from novo_local;
select * from novo_nivel_acesso;
select * from novo_usuario;

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados order by dados_id desc;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro;/*parametros definidos para cada equipamento*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

/*listar*/
SELECT a.equip_id, a.equip_modelo, a.equip_tipo, a.equip_ip, a.equip_mac, a.equip_status, a.equip_observacao, b.local_nome, b.local_descricao
FROM 
	novo_equipamento a,
    novo_local b, 
    novo_equipamento_local c
WHERE 
	c.equip_id = a.equip_id
AND c.local_id = b.local_id
AND b.cli_id = '1';


/*listar*/
SELECT * FROM novo_equipamento;

/*cadastrar*/
INSERT INTO novo_equipamento (equip_modelo, equip_tipo, equip_ip, equip_mac, equip_status, equip_observacao) VALUES (?, ?, ?, ?, ?, ?);

/*editar*/
UPDATE novo_equipamento SET equip_modelo = ?, equip_tipo = ?, equip_ip = ?, equip_mac = ?, equip_status = ?, equip_observacao = ? WHERE equip_id = ?;

/*deletar*/
DELETE FROM novo_equipamento WHERE equip_id = ?;