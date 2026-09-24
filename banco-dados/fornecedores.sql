DROP DATABASE IF EXISTS `fornecedor`;
CREATE DATABASE `fornecedor` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fornecedor`;

CREATE TABLE `fornecedores` (
  `id_fornecedor` int unsigned NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_fantasia` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cnpj` char(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cep` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rua` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bairro` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `complemento` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cidade` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uf` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoria` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ATIVO','INATIVO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `uk_fornecedores_cnpj` (`cnpj`),
  KEY `idx_fornecedores_razao_social` (`razao_social`),
  KEY `idx_fornecedores_categoria` (`categoria`),
  KEY `idx_fornecedores_status` (`status`),
  CONSTRAINT `chk_fornecedores_cnpj` CHECK (char_length(`cnpj`) = 14),
  CONSTRAINT `chk_fornecedores_email` CHECK (`email` like '%_@_%._%'),
  CONSTRAINT `chk_fornecedores_cep` CHECK (`cep` IS NULL OR char_length(`cep`) = 8),
  CONSTRAINT `chk_fornecedores_uf` CHECK (`uf` IS NULL OR `uf` REGEXP '^[A-Z]{2}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fornecedores`
  (`id_fornecedor`, `razao_social`, `nome_fantasia`, `cnpj`, `telefone`, `email`, `cep`, `rua`, `bairro`, `numero`, `complemento`, `cidade`, `uf`, `categoria`, `status`, `data_cadastro`, `data_atualizacao`)
VALUES
  (1, 'Empresa Alfa Comercio e Servicos Ltda', 'Alfa Comercio', '11222333000181', '(62) 3333-1000', 'contato@empresaalfa.com.br', '74000000', 'Rua 1', 'Centro', '100', NULL, 'Goiânia', 'GO', 'Comercio', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (2, 'Beta Tecnologia Ltda', 'Beta Tech', '12345678901230', '(62) 3222-2000', 'contato@betatecnologia.com.br', '74000001', 'Avenida Brasil', 'Setor Central', '200', 'Sala 10', 'Anápolis', 'GO', 'Tecnologia', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (3, 'Gamma Materiais de Escritorio Ltda', 'Gamma Materiais', '98765432109874', '(62) 3444-3000', 'vendas@gammamateriais.com.br', '74000002', 'Rua das Flores', 'Jardim América', '300', NULL, 'Aparecida de Goiânia', 'GO', 'Materiais de Escritório', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (4, 'Delta Servicos Gerais Ltda', 'Delta Serviços', '44556677889930', '(62) 3555-4000', 'contato@deltaservicos.com.br', '74000003', 'Rua 10', 'Setor Oeste', '400', 'Bloco B', 'Goiânia', 'GO', 'Serviços', 'INATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (5, 'Epsilon Distribuidora Ltda', 'Epsilon', '45678901234567', '(62) 3666-5000', 'vendas@epsilondistribuidora.com.br', '74000004', 'Avenida Rio Verde', 'Centro', '500', NULL, 'Rio Verde', 'GO', 'Distribuicao', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32');

CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `perfil` enum('ADMIN','OPERADOR','LEITURA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ATIVO','INATIVO','BLOQUEADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uk_usuarios_email` (`email`),
  KEY `idx_usuarios_status` (`status`),
  KEY `idx_usuarios_perfil` (`perfil`),
  CONSTRAINT `chk_usuarios_email` CHECK (`email` like '%_@_%._%'),
  CONSTRAINT `chk_usuarios_senha` CHECK (char_length(`senha`) > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`nome`, `email`, `senha`, `perfil`, `status`)
VALUES
  ('Administrador', 'admin@fornecedor.local', '$2b$10$B4ddLeEHj5IeAW.pW/AAm.wRplefv59qof0bUOtKgWEBXNEXsvVY.', 'ADMIN', 'ATIVO'),
  ('Operador', 'operador@fornecedor.local', '$2b$10$zMBah3vRijr6a0fPlG4PKOIhYFq7rAZtzj4ZtwiarHiWM3BH9Xpny', 'OPERADOR', 'ATIVO'),
  ('Leitura', 'leitura@fornecedor.local', '$2b$10$CZWujbj3uaQgmla.LNXozekGctDXDRnce/ys9I2hJKH.SillRIICi', 'LEITURA', 'ATIVO');
