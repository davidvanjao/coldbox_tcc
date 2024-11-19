SELECT * FROM novo_equipamento_dados ORDER BY dados_id DESC;
SELECT * FROM novo_equipamento;
SELECT * FROM novo_equipamento_parametro2;
SELECT * FROM novo_equipamento_alertas_enviados;
SELECT * FROM novo_alerta;
SELECT * FROM novo_usuario;
SELECT * FROM novo_local;
SELECT * FROM novo_equipamento_local;

-- Declarar uma variável para capturar o valor de saída
SET @EmiteAviso = 0;

-- Chamar a procedure com os valores desejados
CALL InserirDadosEquipamento(
    1,                 -- equip_id: ID do equipamento
    -5,              -- dados_temp: Temperatura coletada
    50.2,              -- dados_umid: Umidade coletada
    '2024-11-19 19:00:00' -- dados_data: Data da coleta
    
);

-- Consultar o valor retornado na variável de saída
SELECT @EmiteAviso AS TipoAviso;
