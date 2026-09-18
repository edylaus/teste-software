const AppError = require('../models/AppError');

/**
 * Middleware global de tratamento de erros.
 * Deve ser o último middleware registrado em app.js.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: err.status,
      mensagem: err.mensagem,
    });
  }

  // Erro de duplicidade vindo diretamente do MySQL (camada de segurança extra,
  // caso algum ponto do código não trate a duplicidade antes de chegar ao banco).
  if (err && err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      status: 409,
      mensagem: 'Já existe um fornecedor cadastrado com este CNPJ',
    });
  }

  console.error('Erro não tratado:', err);

  return res.status(500).json({
    status: 500,
    mensagem: 'Erro interno do servidor',
  });
}

/**
 * Middleware para rotas não encontradas (404).
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    status: 404,
    mensagem: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
}

module.exports = { errorHandler, notFoundHandler };
