const fornecedorService = require('../services/fornecedorService');

async function cadastrar(req, res, next) {
  try {
    const fornecedor = await fornecedorService.cadastrar(req.body);
    res.status(201).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function listar(req, res, next) {
  try {
    const fornecedores = await fornecedorService.listar();
    res.status(200).json(fornecedores);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const fornecedor = await fornecedorService.buscarPorId(req.params.id);
    res.status(200).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function buscarPorCnpj(req, res, next) {
  try {
    const fornecedor = await fornecedorService.buscarPorCnpj(req.params.cnpj);
    res.status(200).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const fornecedor = await fornecedorService.atualizar(req.params.id, req.body);
    res.status(200).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function inativar(req, res, next) {
  try {
    const fornecedor = await fornecedorService.inativar(req.params.id);
    res.status(200).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function reativar(req, res, next) {
  try {
    const fornecedor = await fornecedorService.reativar(req.params.id);
    res.status(200).json(fornecedor);
  } catch (err) {
    next(err);
  }
}

async function excluir(req, res, next) {
  try {
    await fornecedorService.excluir(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
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
