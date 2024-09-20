select * from novo_clientes;
select * from novo_alerta;
select * from novo_equipamento;
select * from novo_local;
select * from novo_nivel_acesso;
select * from novo_usuario;

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro;/*parametros definidos para cada equipamento*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

/*traz usuario e razao social*/
SELECT a.user_id, a.user_nome,  b.cli_id, b.cli_razaoSocial
FROM 
	novo_usuario a,
    novo_clientes b
WHERE 
	a.user_id = '2'
AND a.cli_id = b.cli_id;

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
SELECT * FROM novo_equipamento_dados WHERE equip_id = '1' ORDER BY dados_data DESC LIMIT 1;