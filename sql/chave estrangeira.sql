select * from novo_clientes; /*ok*/
select * from novo_alerta; /*ok*/
select * from novo_equipamento; /*ok*/
select * from novo_nivel_acesso; /*ok*/

select * from novo_usuario; /*ligacao com nivel, e cliente -- ok*/ 
select * from novo_local; /*associa local e cliente -- ok*/
select * from novo_equipamento_local;/*liga local com equipamento -- ok*/
select * from novo_equipamento_dados;/*relaciona dados com equipamento -- ok*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO - ok*/

select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

ALTER TABLE novo_equipamento_alertas_enviados
ADD CONSTRAINT
FOREIGN KEY (alertEnviado_usuario_retorno) REFERENCES novo_usuario(user_id);

ALTER TABLE novo_equipamento_alertas_enviados
ADD CONSTRAINT
FOREIGN KEY (dados_id) REFERENCES novo_equipamento_dados(dados_id);

ALTER TABLE novo_equipamento_alertas_enviados
ADD CONSTRAINT
FOREIGN KEY (alerta_id) REFERENCES novo_alerta(alerta_id);

ALTER TABLE novo_equipamento_alertas_enviados
ADD CONSTRAINT
FOREIGN KEY (equip_id) REFERENCES novo_equipamento(equip_id);

ALTER TABLE novo_equipamento_parametro2
ADD CONSTRAINT
FOREIGN KEY (equip_id) REFERENCES novo_equipamento(equip_id);

ALTER TABLE novo_equipamento_dados
ADD CONSTRAINT
FOREIGN KEY (equip_id) REFERENCES novo_equipamento(equip_id);

ALTER TABLE novo_equipamento_local
ADD CONSTRAINT
FOREIGN KEY (equip_id) REFERENCES novo_equipamento(equip_id);

ALTER TABLE novo_equipamento_local
ADD CONSTRAINT
FOREIGN KEY (local_id) REFERENCES novo_local(local_id);

ALTER TABLE novo_local
ADD CONSTRAINT
FOREIGN KEY (cli_id) REFERENCES novo_clientes(cli_id);

ALTER TABLE novo_usuario
ADD CONSTRAINT fk_nivel_id
FOREIGN KEY (nivel_id) REFERENCES novo_nivel_acesso(nivel_id);

ALTER TABLE novo_usuario
ADD CONSTRAINT fk_cli_id
FOREIGN KEY (cli_id) REFERENCES novo_clientes(cli_id);

