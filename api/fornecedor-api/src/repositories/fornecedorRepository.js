const { pool } = require('../config/database');

async function criar(dados) {
  const { razaoSocial, cnpj, endereco, telefone, email, segmento } = dados;

  const [result] = await pool.query(
    `INSERT INTO fornecedores
      (razao_social, cnpj, endereco, telefone, email, segmento)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [razaoSocial, cnpj, endereco, telefone, email, segmento],
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
  const { razaoSocial, cnpj, endereco, telefone, email, segmento } = dados;

  await pool.query(
    `UPDATE fornecedores
       SET razao_social = ?,
           cnpj = ?,
           endereco = ?,
           telefone = ?,
           email = ?,
           segmento = ?
     WHERE id_fornecedor = ?`,
    [razaoSocial, cnpj, endereco, telefone, email, segmento, id],
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
