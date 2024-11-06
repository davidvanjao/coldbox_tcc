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

SELECT * FROM novo_equipamento_dados WHERE equip_id = 3 ORDER BY dados_data DESC LIMIT 1;

describe novo_equipamento_dados;

/*novo 3 lista dados*/
SELECT * FROM (
SELECT 
	DATE_FORMAT(a.dados_data, '%Y-%m-%d %H:00:00') AS data_hora,
	CAST(DATE_FORMAT(a.dados_data, '%H') AS UNSIGNED) AS hora,
	ROUND(AVG(CAST(a.dados_temp AS DECIMAL(5,2))), 2) AS media_temperatura,
	ROUND(AVG(CAST(a.dados_umid AS DECIMAL(5,2))), 2) AS media_umidade,
    a.equip_id, c.local_nome
FROM 
	novo_equipamento_dados a,
    novo_equipamento_local b,
    novo_local c
WHERE
	a.equip_id = 4
AND a.equip_id = b.equip_id
AND c.local_id = b.local_id
GROUP BY 
	DATE_FORMAT(a.dados_data, '%Y-%m-%d %H:00:00')
ORDER BY 
	a.dados_data DESC  -- Ordena pela data e hora para obter os mais recentes
LIMIT 6
) AS subconsulta
ORDER BY data_hora ASC;  -- Ordena a seleção final por data e hora em ordem crescente



/*novo 2 lista dados*/
SELECT * FROM (
	SELECT 
		DATE_FORMAT(a.dados_data, '%Y-%m-%d %H:00:00') AS data_hora,
		DATE_FORMAT(a.dados_data, '%H') AS hora,
		ROUND(AVG(CAST(a.dados_temp AS DECIMAL(5,2))), 2) AS media_temperatura,
		ROUND(AVG(CAST(a.dados_umid AS DECIMAL(5,2))), 2) AS media_umidade
	FROM 
		novo_equipamento_dados a
	WHERE
		a.equip_id = 1
	AND DATE_FORMAT(a.dados_data, '%Y-%m-%d') = CURDATE()  -- Usa a data atual
	GROUP BY 
		DATE_FORMAT(a.dados_data, '%Y-%m-%d %H:00:00')
	ORDER BY 
		hora DESC
	LIMIT 6
) AS subconsulta
ORDER BY hora ASC;



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
AND b.equip_id = 1;


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