select * from novo_clientes;
select * from novo_alerta;
select * from novo_equipamento;
select * from novo_local;
select * from novo_nivel_acesso;
select * from novo_usuario;

select * from novo_equipamento_local;/*liga local com equipamento*/
select * from novo_equipamento_dados;/*relaciona dados com equipamento*/
select * from novo_equipamento_parametro;/*parametros definidos para cada equipamento*/
select * from novo_equipamento_parametro2;/*parametros definidos para cada equipamento---NOVO*/
select * from novo_equipamento_alertas_enviados; /*alertas enviados e esperando acao do usuario*/

CREATE TABLE `novo_equipamento_alertas_enviados` (
  `alertEnviado_id` int(11) NOT NULL AUTO_INCREMENT,
  
  `equip_id` int(11) NOT NULL, /*equipamento*/
  `alerta_id` int(11) NOT NULL,/*alerta*/
  
  `alertEnviado_status` varchar(50) NOT NULL, /*status*/
  `alertEnviado_usuario_retorno` varchar(255) NOT NULL, /*usuario que visualizou e deu ok*/
  
  `alertEnviado_data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`alertEnviado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

ALTER TABLE novo_equipamento_alertas_enviados ADD COLUMN nivel_data datetime DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE novo_equipamento_alertas_enviados ADD COLUMN dados_id int(11) after alerta_id;

CREATE TABLE `novo_equipamento_parametro` (
  `param_id` int(11) NOT NULL AUTO_INCREMENT,
  `param_interface` varchar(30) DEFAULT NULL,/*tipo de dispositivo. humidade, temperatura, ...*/
  `param_tipo` varchar(30) DEFAULT NULL,/*maximo, minimo*/
  `param_valor` varchar(10) DEFAULT NULL,
  `param_data` datetime DEFAULT CURRENT_TIMESTAMP,
  `equip_id` int(11) NOT NULL,
  PRIMARY KEY (`param_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `novo_equipamento_parametro2` (
  `param_id` int(11) NOT NULL AUTO_INCREMENT,
  `param_interface` varchar(30) DEFAULT NULL,/*tipo de dispositivo. humidade, temperatura, ...*/
  `param_maximo` varchar(10) DEFAULT NULL,/*maximo*/
  `param_minimo` varchar(10) DEFAULT NULL,/*minimo*/
  `param_data` datetime DEFAULT CURRENT_TIMESTAMP,
  `equip_id` int(11) NOT NULL,
  PRIMARY KEY (`param_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*relaciona dados com equipamento*/
CREATE TABLE `novo_equipamento_dados` (
  `dados_id` int(11) NOT NULL AUTO_INCREMENT,
  `dados_temp` varchar(10) NOT NULL,
  `dados_data` datetime DEFAULT CURRENT_TIMESTAMP,
  `equip_id` int(11) NOT NULL,
  PRIMARY KEY (`dados_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*liga local com equipamento*/
CREATE TABLE `novo_local_equipamento` (
  `localEquip_id` int(11) NOT NULL AUTO_INCREMENT,
  `local_id` int(11) DEFAULT NULL,
  `equip_id` int(11) NOT NULL,
  `localEquip_data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`localEquip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `novo_local` (
  `local_id` int(11) NOT NULL AUTO_INCREMENT,
  `local_nome` varchar(20) DEFAULT NULL,
  `local_descricao` varchar(50) NOT NULL,
  `cli_id`int(11),
  PRIMARY KEY (`local_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

ALTER TABLE novo_local ADD COLUMN local_data datetime DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE `novo_usuario` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_nome` varchar(50) NOT NULL,
  `user_senha` varchar(10) NOT NULL,
  `user_email` varchar(40) DEFAULT NULL,
  `user_tel` varchar(15) NOT NULL,
  `nivel_id` int(11) DEFAULT NULL,
  `user_data` datetime DEFAULT CURRENT_TIMESTAMP,  
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

ALTER TABLE novo_nivel_acesso ADD COLUMN nivel_data datetime DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE `novo_nivel_acesso` (
  `nivel_id` int(11) NOT NULL AUTO_INCREMENT,
  `nivel_acesso` varchar(20) DEFAULT NULL,
  `nivel_descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`nivel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `novo_alerta` (
  `alerta_id` int(11) NOT NULL AUTO_INCREMENT,
  `alerta_tipo` varchar(50) NOT NULL,
  `alerta_descricao` varchar(200) DEFAULT NULL,
  `alerta_data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`alerta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `novo_equipamento` (
  `equip_id` int(11) NOT NULL AUTO_INCREMENT,
  `equip_nome` varchar(50) DEFAULT NULL,
  `equip_modelo` varchar(50) DEFAULT NULL,
  `equip_tipo` varchar(30) DEFAULT NULL,
  `equip_ip` varchar(30) DEFAULT NULL,
  `equip_mac` varchar(30) DEFAULT NULL,
  `equip_status` varchar(20) DEFAULT NULL,
  `equip_observacao` text,
  `equip_data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`equip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;NOW;