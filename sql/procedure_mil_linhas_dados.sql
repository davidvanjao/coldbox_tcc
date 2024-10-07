DELIMITER //

CREATE PROCEDURE gerar_dados_equipamento()
BEGIN
    DECLARE contador INT DEFAULT 0;
    DECLARE equip_id INT;
    DECLARE dados_temp FLOAT;
    DECLARE dados_umid INT;
    DECLARE data_atual DATETIME DEFAULT '2024-10-01 00:00:00';

    WHILE contador < 1000 DO
        -- Equipamento ID entre 1 e 5 (ciclo de 5 equipamentos)
        SET equip_id = (contador % 5) + 1;
        
        -- Gerar temperatura entre -10 e -2 (câmara fria)
        SET dados_temp = -10 + RAND() * 8;
        
        -- Gerar umidade entre 80% e 100%
        SET dados_umid = FLOOR(80 + (RAND() * 21));
        
        -- Inserir dados na tabela
        INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, equip_id, equip_data)
        VALUES (dados_temp, dados_umid, equip_id, data_atual);
        
        -- Incrementar a data em 30 minutos
        SET data_atual = DATE_ADD(data_atual, INTERVAL 30 MINUTE);
        
        -- Incrementa o contador para continuar o loop
        SET contador = contador + 1;
    END WHILE;
END //

DELIMITER ;

CALL gerar_dados_equipamento();
