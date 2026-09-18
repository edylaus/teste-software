const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/config/database');

/**

Estes testes assumem um banco MySQL disponível conforme configurado
em .env (ou DB_NAME_TEST). A tabela fornecedores é limpa antes de
cada teste para garantir isolamento entre os casos.
*/

const fornecedorValido = () => ({
razaoSocial: 'Empresa Teste Automatizado LTDA',
nomeFantasia: 'Empresa Teste',
cnpj: '11222333000181', // CNPJ com dígitos verificadores válidos
telefone: '(62) 98888-7777',
email: 'teste@empresateste.com',
cep: '74000000',
cidade: 'Goiânia',
uf: 'GO',
categoria: 'Tecnologia',
});

beforeAll(async () => {
await pool.query('DELETE FROM fornecedores');
});

afterEach(async () => {
await pool.query('DELETE FROM fornecedores');
});

afterAll(async () => {
await pool.end();
});

describe('POST /api/fornecedores', () => {
test('deve cadastrar um fornecedor com dados válidos', async () => {
const resposta = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

expect(resposta.status).toBe(201);
expect(resposta.body).toHaveProperty('id');
expect(resposta.body.status).toBe('ATIVO');
expect(resposta.body.cnpj).toBe('11222333000181');
expect(resposta.body.razaoSocial).toBe('Empresa Teste Automatizado LTDA');
expect(resposta.body.nomeFantasia).toBe('Empresa Teste');
expect(resposta.body.categoria).toBe('Tecnologia');

});

test('deve rejeitar cadastro sem campos obrigatórios', async () => {
const resposta = await request(app)
.post('/api/fornecedores')
.send({ razaoSocial: 'Empresa Incompleta' });

expect(resposta.status).toBe(400);
expect(resposta.body).toHaveProperty('mensagem');

});

test('deve rejeitar CNPJ inválido', async () => {
const resposta = await request(app)
.post('/api/fornecedores')
.send({
...fornecedorValido(),
cnpj: '11111111111111',
});

expect(resposta.status).toBe(400);
expect(resposta.body.mensagem).toMatch(/cnpj/i);

});

test('deve rejeitar CNPJ duplicado', async () => {
await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .post('/api/fornecedores')
  .send(fornecedorValido());

expect(resposta.status).toBe(409);
expect(resposta.body.mensagem).toMatch(/já existe/i);

});
});

describe('GET /api/fornecedores', () => {
test('deve listar fornecedores cadastrados', async () => {
await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .get('/api/fornecedores');

expect(resposta.status).toBe(200);
expect(Array.isArray(resposta.body)).toBe(true);
expect(resposta.body.length).toBe(1);

});
});

describe('GET /api/fornecedores/', () => {
test('deve consultar fornecedor por ID existente', async () => {
const criado = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .get(`/api/fornecedores/${criado.body.id}`);

expect(resposta.status).toBe(200);
expect(resposta.body.id).toBe(criado.body.id);
expect(resposta.body.nomeFantasia).toBe('Empresa Teste');
expect(resposta.body.cidade).toBe('Goiânia');
expect(resposta.body.uf).toBe('GO');

});

test('deve retornar 404 para fornecedor inexistente', async () => {
const resposta = await request(app)
.get('/api/fornecedores/999999');

expect(resposta.status).toBe(404);

});
});

describe('GET /api/fornecedores/cnpj/', () => {
test('deve consultar fornecedor por CNPJ existente', async () => {
await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .get('/api/fornecedores/cnpj/11222333000181');

expect(resposta.status).toBe(200);
expect(resposta.body.cnpj).toBe('11222333000181');
expect(resposta.body.razaoSocial).toBe(
  'Empresa Teste Automatizado LTDA',
);

});

test('deve retornar 404 para CNPJ inexistente', async () => {
const resposta = await request(app)
.get('/api/fornecedores/cnpj/12345678000190');

expect(resposta.status).toBe(404);

});
});

describe('PUT /api/fornecedores/', () => {
test('deve atualizar um fornecedor existente', async () => {
const criado = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .put(`/api/fornecedores/${criado.body.id}`)
  .send({
    ...fornecedorValido(),
    razaoSocial: 'Empresa Teste Atualizada LTDA',
    nomeFantasia: 'Empresa Atualizada',
    telefone: '(62) 97777-6666',
    cidade: 'Aparecida de Goiânia',
    categoria: 'Serviços',
  });

expect(resposta.status).toBe(200);
expect(resposta.body.razaoSocial).toBe(
  'Empresa Teste Atualizada LTDA',
);
expect(resposta.body.nomeFantasia).toBe('Empresa Atualizada');
expect(resposta.body.telefone).toBe('(62) 97777-6666');
expect(resposta.body.cidade).toBe('Aparecida de Goiânia');
expect(resposta.body.categoria).toBe('Serviços');

});

test('não deve atualizar fornecedor inexistente', async () => {
const resposta = await request(app)
.put('/api/fornecedores/999999')
.send(fornecedorValido());

expect(resposta.status).toBe(404);

});
});

describe('PATCH /api/fornecedores//inativar e /reativar', () => {
test('deve inativar um fornecedor ativo', async () => {
const criado = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .patch(`/api/fornecedores/${criado.body.id}/inativar`);

expect(resposta.status).toBe(200);
expect(resposta.body.status).toBe('INATIVO');

});

test('deve reativar um fornecedor inativo', async () => {
const criado = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

await request(app)
  .patch(`/api/fornecedores/${criado.body.id}/inativar`);

const resposta = await request(app)
  .patch(`/api/fornecedores/${criado.body.id}/reativar`);

expect(resposta.status).toBe(200);
expect(resposta.body.status).toBe('ATIVO');

});

test('não deve inativar fornecedor inexistente', async () => {
const resposta = await request(app)
.patch('/api/fornecedores/999999/inativar');

expect(resposta.status).toBe(404);

});
});

describe('DELETE /api/fornecedores/', () => {
test('deve excluir um fornecedor existente', async () => {
const criado = await request(app)
.post('/api/fornecedores')
.send(fornecedorValido());

const resposta = await request(app)
  .delete(`/api/fornecedores/${criado.body.id}`);

expect(resposta.status).toBe(204);

const consulta = await request(app)
  .get(`/api/fornecedores/${criado.body.id}`);

expect(consulta.status).toBe(404);

});

test('não deve excluir fornecedor inexistente', async () => {
const resposta = await request(app)
.delete('/api/fornecedores/999999');

expect(resposta.status).toBe(404);

});
});