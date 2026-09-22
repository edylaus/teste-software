DROP DATABASE IF EXISTS `fornecedores`;
CREATE DATABASE `fornecedores` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fornecedores`;

CREATE TABLE `fornecedores` (
  `id_fornecedor` int unsigned NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_fantasia` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cnpj` char(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cep` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  (`id_fornecedor`, `razao_social`, `nome_fantasia`, `cnpj`, `telefone`, `email`, `cep`, `cidade`, `uf`, `categoria`, `status`, `data_cadastro`, `data_atualizacao`)
VALUES
  (1, 'Empresa Alfa Comercio e Servicos Ltda', 'Alfa Comercio', '11222333000181', '(62) 3333-1000', 'contato@empresaalfa.com.br', '74000000', 'Goiânia', 'GO', 'Comercio', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (2, 'Beta Tecnologia Ltda', 'Beta Tech', '12345678901230', '(62) 3222-2000', 'contato@betatecnologia.com.br', '74000001', 'Anápolis', 'GO', 'Tecnologia', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (3, 'Gamma Materiais de Escritorio Ltda', 'Gamma Materiais', '98765432109874', '(62) 3444-3000', 'vendas@gammamateriais.com.br', '74000002', 'Aparecida de Goiânia', 'GO', 'Materiais de Escritório', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (4, 'Delta Servicos Gerais Ltda', 'Delta Serviços', '44556677889930', '(62) 3555-4000', 'contato@deltaservicos.com.br', '74000003', 'Goiânia', 'GO', 'Serviços', 'INATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (5, 'Epsilon Distribuidora Ltda', 'Epsilon', '45678901234567', '(62) 3666-5000', 'vendas@epsilondistribuidora.com.br', '74000004', 'Rio Verde', 'GO', 'Distribuicao', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32');

CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `perfil` enum('ADMIN','OPERADOR','LEITURA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ATIVO','INATIVO','BLOQUEADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uk_usuarios_email` (`email`),
  KEY `idx_usuarios_status` (`status`),
  KEY `idx_usuarios_perfil` (`perfil`),
  CONSTRAINT `chk_usuarios_email` CHECK (`email` like '%_@_%._%'),
  CONSTRAINT `chk_usuarios_senha_hash` CHECK (char_length(`senha_hash`) > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`nome`, `email`, `senha_hash`, `perfil`, `status`)
VALUES
  ('Administrador', 'admin@fornecedor.local', SHA2('admin123', 256), 'ADMIN', 'ATIVO'),
  ('Operador', 'operador@fornecedor.local', SHA2('operador123', 256), 'OPERADOR', 'ATIVO'),
  ('Leitura', 'leitura@fornecedor.local', SHA2('leitura123', 256), 'LEITURA', 'ATIVO');
