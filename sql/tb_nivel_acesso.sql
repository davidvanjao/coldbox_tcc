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
SELECT * FROM novo_nivel_acesso;

/*cadastrar*/
INSERT INTO novo_nivel_acesso (nivel_acesso, nivel_descricao) VALUES (?, ?);


/*editar*/
UPDATE novo_local SET local_nome = ?, local_descricao = ?, cli_id = ? WHERE local_id = ?;

/*deletar*/
DELETE FROM novo_local WHERE equip_id = ?;