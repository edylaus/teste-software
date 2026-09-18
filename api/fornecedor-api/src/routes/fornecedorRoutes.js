const express = require('express');
const fornecedorController = require('../controllers/fornecedorController');
const {
  validarCriacaoFornecedor,
  validarAtualizacaoFornecedor,
  validarIdParametro,
} = require('../middlewares/validarFornecedor');

const router = express.Router();

/**
 * @openapi
 * /api/fornecedores:
 *   post:
 *     summary: Cadastra um novo fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FornecedorInput'
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       409:
 *         description: CNPJ duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.post('/', validarCriacaoFornecedor, fornecedorController.cadastrar);

/**
 * @openapi
 * /api/fornecedores:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 */
router.get('/', fornecedorController.listar);

/**
 * @openapi
 * /api/fornecedores/cnpj/{cnpj}:
 *   get:
 *     summary: Consulta um fornecedor pelo CNPJ
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678000190"
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.get('/cnpj/:cnpj', fornecedorController.buscarPorCnpj);

/**
 * @openapi
 * /api/fornecedores/{id}:
 *   get:
 *     summary: Consulta um fornecedor pelo ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.get('/:id', validarIdParametro, fornecedorController.buscarPorId);

/**
 * @openapi
 * /api/fornecedores/{id}:
 *   put:
 *     summary: Atualiza os dados de um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FornecedorInput'
 *     responses:
 *       200:
 *         description: Fornecedor atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Fornecedor não encontrado
 *       409:
 *         description: CNPJ duplicado
 */
router.put('/:id', validarIdParametro, validarAtualizacaoFornecedor, fornecedorController.atualizar);

/**
 * @openapi
 * /api/fornecedores/{id}/inativar:
 *   patch:
 *     summary: Inativa um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornecedor inativado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 */
router.patch('/:id/inativar', validarIdParametro, fornecedorController.inativar);

/**
 * @openapi
 * /api/fornecedores/{id}/reativar:
 *   patch:
 *     summary: Reativa um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornecedor reativado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Fornecedor não encontrado
 */
router.patch('/:id/reativar', validarIdParametro, fornecedorController.reativar);

/**
 * @openapi
 * /api/fornecedores/{id}:
 *   delete:
 *     summary: Exclui um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Fornecedor excluído com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 */
router.delete('/:id', validarIdParametro, fornecedorController.excluir);

module.exports = router;
