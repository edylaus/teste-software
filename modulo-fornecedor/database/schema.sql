CREATE DATABASE IF NOT EXISTS `fornecedores` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fornecedores`;

DROP TABLE IF EXISTS `fornecedores`;
DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `fornecedores` (
  `id_fornecedor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(150) NOT NULL,
  `nome_fantasia` VARCHAR(150) DEFAULT NULL,
  `cnpj` CHAR(14) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `cep` VARCHAR(9) DEFAULT NULL,
  `rua` VARCHAR(150) DEFAULT NULL,
  `bairro` VARCHAR(100) DEFAULT NULL,
  `numero` VARCHAR(20) DEFAULT NULL,
  `complemento` VARCHAR(100) DEFAULT NULL,
  `cidade` VARCHAR(100) DEFAULT NULL,
  `uf` CHAR(2) DEFAULT NULL,
  `categoria` VARCHAR(100) NOT NULL,
  `status` ENUM('ATIVO','INATIVO') NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `uk_fornecedores_cnpj` (`cnpj`),
  KEY `idx_fornecedores_razao_social` (`razao_social`),
  KEY `idx_fornecedores_categoria` (`categoria`),
  KEY `idx_fornecedores_status` (`status`),
  CONSTRAINT `chk_fornecedores_cnpj` CHECK (CHAR_LENGTH(`cnpj`) = 14),
  CONSTRAINT `chk_fornecedores_email` CHECK (`email` LIKE '%_@_%._%'),
  CONSTRAINT `chk_fornecedores_cep` CHECK (`cep` IS NULL OR CHAR_LENGTH(`cep`) = 8),
  CONSTRAINT `chk_fornecedores_uf` CHECK (`uf` IS NULL OR `uf` REGEXP '^[A-Z]{2}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `usuarios` (
  `id_usuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha_hash` VARCHAR(255) NOT NULL,
  `perfil` ENUM('ADMIN','OPERADOR','LEITURA') NOT NULL,
  `status` ENUM('ATIVO','INATIVO','BLOQUEADO') NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uk_usuarios_email` (`email`),
  KEY `idx_usuarios_status` (`status`),
  KEY `idx_usuarios_perfil` (`perfil`),
  CONSTRAINT `chk_usuarios_email` CHECK (`email` LIKE '%_@_%._%'),
  CONSTRAINT `chk_usuarios_senha_hash` CHECK (CHAR_LENGTH(`senha_hash`) > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
