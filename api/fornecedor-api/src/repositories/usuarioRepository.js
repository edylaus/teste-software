const { pool } = require('../config/database');

async function buscarPorEmail(email) {
  const [rows] = await pool.query(
    `SELECT
      id_usuario,
      nome,
      email,
      senha,
      status
    FROM usuarios
    WHERE email = ?
    LIMIT 1`,
    [email]
  );

  return rows[0] || null;
}

module.exports = {
  buscarPorEmail,
};