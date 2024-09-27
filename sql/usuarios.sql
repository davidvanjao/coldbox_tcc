select * from novo_alerta; /*ok*/
select * from novo_clientes; /*ok*/
select * from novo_equipamento;/*ok*/
select * from novo_local;/*ok*/
select * from novo_nivel_acesso;/*ok*/
select * from novo_usuario;/*ok*/

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados order by dados_id desc;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO ok*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

/*lista todos os usuarios relacionados a empresa*/
select * from novo_usuario WHERE cli_id = '2';

/*cadastrar*/
INSERT INTO novo_usuario (user_nome, user_senha, user_email, user_tel, nivel_id, user_imagem_perfil, cli_id) VALUES (?, ?, ?, ?, ?, ?, ?);

/*editar*/
UPDATE novo_usuario SET user_nome = ?, user_senha = ?, user_email = ?, user_tel = ?, nivel_id = ?,  user_imagem_perfil = ?, user_status = ? WHERE user_id = ?;


/*verifica se usuario existe*/
select user_id, user_nome, user_senha, user_email, user_tel, nivel_id from novo_usuario where user_email = 'DAVIDRAFAELDJ@HOTMAIL.COM' and user_senha = '123';

/*listar usuarios*/
select user_id, user_nome, user_senha, user_email, user_tel, nivel_id from novo_usuario;



/*apagar*/
DELETE FROM novo_usuario WHERE user_id = ?;