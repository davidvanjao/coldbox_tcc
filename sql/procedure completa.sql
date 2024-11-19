DROP PROCEDURE InserirDadosEquipamento

DELIMITER $$

CREATE PROCEDURE InserirDadosEquipamento(
    IN eqp_id INT,
    IN dados_temp DECIMAL(10,2),
    IN dados_umid DECIMAL(10,2),
    IN dados_data DATETIME
)
BEGIN
    DECLARE parametro_minimo DECIMAL(10,2);
    DECLARE parametro_maximo DECIMAL(10,2);
    DECLARE dados_id INT;
    DECLARE emite_aviso TINYINT;

    -- Obter os parâmetros mínimo e máximo
    SELECT param_minimo, param_maximo
    INTO parametro_minimo, parametro_maximo
    FROM novo_equipamento_parametro2
    WHERE equip_id = eqp_id;

    -- Inserir os dados na tabela e capturar o ID gerado
    INSERT INTO novo_equipamento_dados (dados_temp, dados_umid, dados_data, equip_id)
    VALUES (dados_temp, dados_umid, dados_data, eqp_id);
    SET dados_id = LAST_INSERT_ID();

    -- Verificar e definir o aviso
    IF dados_temp <= parametro_minimo THEN
        SET emite_aviso = 2;
    ELSEIF dados_temp >= parametro_maximo THEN
        SET emite_aviso = 1;
    ELSE
        SET emite_aviso = 0;
    END IF;

    -- Registrar alerta se necessário
    IF emite_aviso <> 0 THEN
        INSERT INTO novo_equipamento_alertas_enviados (equip_id, alerta_id, dados_id)
        VALUES (eqp_id, emite_aviso, dados_id);
    END IF;

END$$

DELIMITER ;
