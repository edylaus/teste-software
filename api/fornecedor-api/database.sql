-- ============================================================
-- database.sql
-- Módulo Fornecedor - Script de criação do banco de dados
-- Execução: mysql -u root -p < database.sql
-- ============================================================

-- 1. Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `fornecedor`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `fornecedor`;

-- 2. Criação da tabela fornecedores
DROP TABLE IF EXISTS `fornecedores`;

CREATE TABLE `fornecedores` (
  `id_fornecedor` int unsigned NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cnpj` char(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `segmento` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ATIVO','INATIVO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ATIVO',
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- 3. Constraints
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE KEY `uk_fornecedores_cnpj` (`cnpj`),
  CONSTRAINT `chk_fornecedores_cnpj` CHECK ((`cnpj` regexp '^[0-9]{14}$')),
  CONSTRAINT `chk_fornecedores_email` CHECK ((`email` regexp '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Índices adicionais (para consultas e filtros comuns)
CREATE INDEX `idx_fornecedores_razao_social` ON `fornecedores` (`razao_social`);
CREATE INDEX `idx_fornecedores_segmento` ON `fornecedores` (`segmento`);
CREATE INDEX `idx_fornecedores_status` ON `fornecedores` (`status`);

-- 5. INSERTs de exemplo
INSERT INTO `fornecedores`
  (`id_fornecedor`, `razao_social`, `cnpj`, `endereco`, `telefone`, `email`, `segmento`, `status`, `data_cadastro`, `data_atualizacao`)
VALUES
  (1, 'Empresa Alfa Comercio e Servicos Ltda', '12345678000190', 'Rua das Flores, 100, Centro, Goiania - GO', '(62) 3333-1000', 'contato@empresaalfa.com.br', 'Comercio', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (2, 'Beta Tecnologia Ltda', '23456789000101', 'Avenida Brasil, 500, Setor Oeste, Goiania - GO', '(62) 3222-2000', 'contato@betatecnologia.com.br', 'Tecnologia', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (3, 'Gamma Materiais de Escritorio Ltda', '34567890000112', 'Rua 10, 250, Setor Bueno, Goiania - GO', '(62) 3444-3000', 'vendas@gammamateriais.com.br', 'Materiais de Escritorio', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (4, 'Delta Servicos Gerais Ltda', '45678901000123', 'Avenida Independencia, 1200, Campinas, Goiania - GO', '(62) 3555-4000', 'contato@deltaservicos.com.br', 'Servicos', 'INATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32'),
  (5, 'Epsilon Distribuidora Ltda', '56789012000134', 'Rua Central, 750, Setor Aeroporto, Goiania - GO', '(62) 3666-5000', 'vendas@epsilondistribuidora.com.br', 'Distribuicao', 'ATIVO', '2026-09-14 15:48:32', '2026-09-14 15:48:32');

-- ============================================================
-- (Opcional) Banco de dados separado para os testes automatizados.
-- Descomente as linhas abaixo caso queira um banco isolado para
-- rodar "npm test" sem afetar os dados de desenvolvimento.
-- ============================================================
-- CREATE DATABASE IF NOT EXISTS `fornecedor_test`
--   CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;
--
-- USE `fornecedor_test`;
--
-- CREATE TABLE `fornecedores` LIKE `fornecedor`.`fornecedores`;
