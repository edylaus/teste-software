/**
 * Erro de aplicação com status HTTP associado.
 * Usado pelas camadas de service/controller para sinalizar
 * erros de negócio de forma padronizada (capturado pelo
 * middleware global de tratamento de erros).
 */
class AppError extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.name = 'AppError';
    this.status = status;
    this.mensagem = mensagem;
  }
}

module.exports = AppError;
