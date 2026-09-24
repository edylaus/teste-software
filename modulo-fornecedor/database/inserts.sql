USE `fornecedor`;

INSERT INTO `fornecedores`
  (`razao_social`, `nome_fantasia`, `cnpj`, `telefone`, `email`, `cep`, `rua`, `bairro`, `numero`, `complemento`, `cidade`, `uf`, `categoria`, `status`)
VALUES
  ('Empresa Alfa Comercio e Servicos Ltda', 'Alfa Comercio', '11222333000181', '(62) 3333-1000', 'contato@empresaalfa.com.br', '74000000', 'Rua 1', 'Centro', '100', NULL, 'Goiânia', 'GO', 'Comercio', 'ATIVO'),
  ('Beta Tecnologia Ltda', 'Beta Tech', '12345678901230', '(62) 3222-2000', 'contato@betatecnologia.com.br', '74000001', 'Avenida Brasil', 'Setor Central', '200', 'Sala 10', 'Anápolis', 'GO', 'Tecnologia', 'ATIVO'),
  ('Gamma Materiais de Escritorio Ltda', 'Gamma Materiais', '98765432109874', '(62) 3444-3000', 'vendas@gammamateriais.com.br', '74000002', 'Rua das Flores', 'Jardim América', '300', NULL, 'Aparecida de Goiânia', 'GO', 'Materiais de Escritório', 'ATIVO'),
  ('Delta Servicos Gerais Ltda', 'Delta Serviços', '44556677889930', '(62) 3555-4000', 'contato@deltaservicos.com.br', '74000003', 'Rua 10', 'Setor Oeste', '400', 'Bloco B', 'Goiânia', 'GO', 'Serviços', 'INATIVO'),
  ('Epsilon Distribuidora Ltda', 'Epsilon', '45678901234567', '(62) 3666-5000', 'vendas@epsilondistribuidora.com.br', '74000004', 'Avenida Rio Verde', 'Centro', '500', NULL, 'Rio Verde', 'GO', 'Distribuicao', 'ATIVO');

INSERT INTO `usuarios` (`nome`, `email`, `senha`, `perfil`, `status`)
VALUES
  ('Administrador', 'admin@fornecedor.local', '$2b$10$B4ddLeEHj5IeAW.pW/AAm.wRplefv59qof0bUOtKgWEBXNEXsvVY.', 'ADMIN', 'ATIVO'),
  ('Operador', 'operador@fornecedor.local', '$2b$10$zMBah3vRijr6a0fPlG4PKOIhYFq7rAZtzj4ZtwiarHiWM3BH9Xpny', 'OPERADOR', 'ATIVO'),
  ('Leitura', 'leitura@fornecedor.local', '$2b$10$CZWujbj3uaQgmla.LNXozekGctDXDRnce/ys9I2hJKH.SillRIICi', 'LEITURA', 'ATIVO');

SELECT * FROM `usuarios`;
SELECT * FROM `fornecedores`;
