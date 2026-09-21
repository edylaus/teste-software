const AppError = require('../models/AppError');

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const CNPJ_REGEX = /^[0-9]{14}$/;

/**
 * Valida o CNPJ usando o algoritmo oficial de dígitos verificadores.
 */
function cnpjEhValido(cnpj) {
  if (!CNPJ_REGEX.test(cnpj)) return false;

  // Rejeita sequências de dígitos repetidos (ex: 00000000000000)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const calcularDigito = (base) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const soma = base
      .split('')
      .reduce((acc, digito, index) => acc + Number(digito) * pesos[index], 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base12 = cnpj.substring(0, 12);
  const digito1 = calcularDigito(base12);
  const digito2 = calcularDigito(base12 + digito1);

  return cnpj === base12 + String(digito1) + String(digito2);
}

function camposObrigatoriosPresentes(body) {
  const obrigatorios = ['razaoSocial', 'cnpj', 'telefone', 'email', 'categoria'];
  return obrigatorios.filter((campo) => {
    const valor = body[campo];
    return valor === undefined || valor === null || String(valor).trim() === '';
  });
}

/**
 * Middleware para validação de criação (POST) - todos os campos obrigatórios.
 */
function validarCriacaoFornecedor(req, res, next) {
  try {
    const faltando = camposObrigatoriosPresentes(req.body || {});
    if (faltando.length > 0) {
      throw new AppError(400, `Campos obrigatórios não informados: ${faltando.join(', ')}`);
    }

    validarConteudoCampos(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Middleware para validação de atualização (PUT) - mesmos campos obrigatórios.
 */
function validarAtualizacaoFornecedor(req, res, next) {
  try {
    const faltando = camposObrigatoriosPresentes(req.body || {});
    if (faltando.length > 0) {
      throw new AppError(400, `Campos obrigatórios não informados: ${faltando.join(', ')}`);
    }

    validarConteudoCampos(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

function validarConteudoCampos(body) {
  const { cnpj, email, razaoSocial } = body;

  if (String(razaoSocial).trim().length < 3) {
    throw new AppError(400, 'Razão social deve possuir ao menos 3 caracteres');
  }

  const cnpjLimpo = String(cnpj).replace(/\D/g, '');
  if (!cnpjEhValido(cnpjLimpo)) {
    throw new AppError(400, 'CNPJ inválido');
  }
  body.cnpj = cnpjLimpo;

  if (!EMAIL_REGEX.test(String(email).trim())) {
    throw new AppError(400, 'E-mail inválido');
  }
}

function validarIdParametro(req, res, next) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return next(new AppError(400, 'Identificador de fornecedor inválido'));
  }
  next();
}

module.exports = {
  validarCriacaoFornecedor,
  validarAtualizacaoFornecedor,
  validarIdParametro,
  cnpjEhValido,
};
