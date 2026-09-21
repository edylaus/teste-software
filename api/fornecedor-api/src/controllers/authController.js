const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const usuario = await authService.autenticar(email, senha);

    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};