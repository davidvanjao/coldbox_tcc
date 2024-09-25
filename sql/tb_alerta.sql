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
SELECT * FROM NOVO_ALERTA;

/*cadastrar*/
INSERT INTO NOVO_ALERTA (ALERTA_TIPO, ALERTA_DESCRICAO) VALUES (?, ?);

/*editar*/
UPDATE NOVO_ALERTA SET ALERTA_TIPO = ?, ALERTA_DESCRICAO = ? WHERE ALERTA_ID = ?;

/*deletar*/
DELETE FROM NOVO_ALERTA WHERE ALERTA_ID = ?;



