const mysql = require('mysql2/promise');
require('dotenv').config();

const isTestEnv = process.env.NODE_ENV === 'test';

const dbName = isTestEnv
  ? (process.env.DB_NAME_TEST || process.env.DB_NAME)
  : process.env.DB_NAME;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: dbName || 'fornecedor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

/**
 * Testa a conexão com o banco de dados.
 * Utilizado na inicialização do servidor para falhar rápido
 * caso o MySQL não esteja acessível.
 */
async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}

module.exports = { pool, testConnection };
