select * from novo_usuario;
/*verifica se usuario existe*/
select user_id, user_nome, user_senha, user_email, user_tel, nivel_id from novo_usuario where user_email = 'DAVIDRAFAELDJ@HOTMAIL.COM' and user_senha = '123';

/*listar usuarios*/
select user_id, user_nome, user_senha, user_email, user_tel, nivel_id from novo_usuario;

/*cadastrar*/
INSERT INTO novo_usuario
(user_nome, user_senha, user_email, user_tel, nivel_id) 
VALUES (?, ?, ?, ?, ?);

/*editar*/
UPDATE novo_usuario SET
user_nome = ?, user_senha = ?, user_email = ?, user_tel = ?, nivel_id = ?
WHERE user_id = ?;

/*apagar*/
DELETE FROM novo_usuario WHERE user_id = ?;