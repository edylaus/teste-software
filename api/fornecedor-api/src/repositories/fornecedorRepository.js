const { pool } = require('../config/database');

async function criar(dados) {
  const {
    razaoSocial,
    nomeFantasia,
    cnpj,
    telefone,
    email,
    cep,
    cidade,
    uf,
    categoria,
  } = dados;

  const [result] = await pool.query(
    `INSERT INTO fornecedores
      (
        razao_social,
        nome_fantasia,
        cnpj,
        telefone,
        email,
        cep,
        cidade,
        uf,
        categoria
      )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      razaoSocial,
      nomeFantasia,
      cnpj,
      telefone,
      email,
      cep,
      cidade,
      uf,
      categoria,
    ],
  );

  return buscarPorId(result.insertId);
}

async function listarTodos() {
  const [rows] = await pool.query(
    'SELECT * FROM fornecedores ORDER BY id_fornecedor ASC',
  );

  return rows;
}

async function buscarPorId(id) {
  const [rows] = await pool.query(
    'SELECT * FROM fornecedores WHERE id_fornecedor = ? LIMIT 1',
    [id],
  );

  return rows[0] || null;
}

async function buscarPorCnpj(cnpj) {
  const [rows] = await pool.query(
    'SELECT * FROM fornecedores WHERE cnpj = ? LIMIT 1',
    [cnpj],
  );

  return rows[0] || null;
}

async function atualizar(id, dados) {
  const {
    razaoSocial,
    nomeFantasia,
    cnpj,
    telefone,
    email,
    cep,
    cidade,
    uf,
    categoria,
  } = dados;

  await pool.query(
    `UPDATE fornecedores
       SET razao_social = ?,
           nome_fantasia = ?,
           cnpj = ?,
           telefone = ?,
           email = ?,
           cep = ?,
           cidade = ?,
           uf = ?,
           categoria = ?
     WHERE id_fornecedor = ?`,
    [
      razaoSocial,
      nomeFantasia,
      cnpj,
      telefone,
      email,
      cep,
      cidade,
      uf,
      categoria,
      id,
    ],
  );

  return buscarPorId(id);
}

async function atualizarStatus(id, status) {
  await pool.query(
    'UPDATE fornecedores SET status = ? WHERE id_fornecedor = ?',
    [status, id],
  );

  return buscarPorId(id);
}

async function excluir(id) {
  const [result] = await pool.query(
    'DELETE FROM fornecedores WHERE id_fornecedor = ?',
    [id],
  );

  return result.affectedRows > 0;
}

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  buscarPorCnpj,
  atualizar,
  atualizarStatus,
  excluir,
};