const fornecedorRepository = require('../repositories/fornecedorRepository');
const Fornecedor = require('../models/Fornecedor');
const AppError = require('../models/AppError');

async function cadastrar(dados) {
  const existente = await fornecedorRepository.buscarPorCnpj(dados.cnpj);
  if (existente) {
    throw new AppError(409, 'Já existe um fornecedor cadastrado com este CNPJ');
  }

  const row = await fornecedorRepository.criar(dados);
  return Fornecedor.fromRow(row);
}

async function listar() {
  const rows = await fornecedorRepository.listarTodos();
  return Fornecedor.fromRows(rows);
}

async function buscarPorId(id) {
  const row = await fornecedorRepository.buscarPorId(id);
  if (!row) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }
  return Fornecedor.fromRow(row);
}

async function buscarPorCnpj(cnpj) {
  const cnpjLimpo = String(cnpj).replace(/\D/g, '');
  const row = await fornecedorRepository.buscarPorCnpj(cnpjLimpo);
  if (!row) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }
  return Fornecedor.fromRow(row);
}

async function atualizar(id, dados) {
  const existente = await fornecedorRepository.buscarPorId(id);
  if (!existente) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }

  const fornecedorComMesmoCnpj = await fornecedorRepository.buscarPorCnpj(dados.cnpj);
  if (fornecedorComMesmoCnpj && fornecedorComMesmoCnpj.id_fornecedor !== Number(id)) {
    throw new AppError(409, 'Já existe um fornecedor cadastrado com este CNPJ');
  }

  const row = await fornecedorRepository.atualizar(id, dados);
  return Fornecedor.fromRow(row);
}

async function inativar(id) {
  const existente = await fornecedorRepository.buscarPorId(id);
  if (!existente) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }

  if (existente.status === 'INATIVO') {
    throw new AppError(400, 'Fornecedor já está inativo');
  }

  const row = await fornecedorRepository.atualizarStatus(id, 'INATIVO');
  return Fornecedor.fromRow(row);
}

async function reativar(id) {
  const existente = await fornecedorRepository.buscarPorId(id);
  if (!existente) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }

  if (existente.status === 'ATIVO') {
    throw new AppError(400, 'Fornecedor já está ativo');
  }

  const row = await fornecedorRepository.atualizarStatus(id, 'ATIVO');
  return Fornecedor.fromRow(row);
}

async function excluir(id) {
  const existente = await fornecedorRepository.buscarPorId(id);
  if (!existente) {
    throw new AppError(404, 'Fornecedor não encontrado');
  }

  await fornecedorRepository.excluir(id);
}

module.exports = {
  cadastrar,
  listar,
  buscarPorId,
  buscarPorCnpj,
  atualizar,
  inativar,
  reativar,
  excluir,
};
