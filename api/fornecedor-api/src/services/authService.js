const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');
const AppError = require('../models/AppError');

async function autenticar(email, senha) {
  if (!email || !senha) {
    throw new AppError(400, 'E-mail e senha são obrigatórios');
  }

  const usuario = await usuarioRepository.buscarPorEmail(email);

  if (!usuario) {
    throw new AppError(401, 'E-mail ou senha inválidos');
  }

  if (usuario.status !== 'ATIVO') {
    throw new AppError(403, 'Usuário inativo');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new AppError(401, 'E-mail ou senha inválidos');
  }

  return {
    id: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
  };
}

module.exports = {
  autenticar,
};