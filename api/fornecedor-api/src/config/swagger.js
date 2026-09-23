const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Módulo Fornecedor',
      version: '1.0.0',
      description:
        'API REST para gerenciamento de fornecedores (cadastro, consulta, atualização, inativação, reativação e exclusão).',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Fornecedor: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            razaoSocial: {
              type: 'string',
              example: 'Empresa Exemplo LTDA',
            },
            nomeFantasia: {
              type: 'string',
              nullable: true,
              example: 'Empresa Exemplo',
            },
            cnpj: {
              type: 'string',
              example: '12345678000199',
            },
            telefone: {
              type: 'string',
              example: '(62) 99999-9999',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@empresa.com',
            },
            cep: {
              type: 'string',
              nullable: true,
              example: '74000000',
            },
            rua: { type: 'string', nullable: true, example: 'Avenida Brasil' },
            bairro: { type: 'string', nullable: true, example: 'Setor Central' },
            numero: { type: 'string', nullable: true, example: '100' },
            complemento: { type: 'string', nullable: true, example: 'Sala 10' },
            cidade: {
              type: 'string',
              nullable: true,
              example: 'Goiânia',
            },
            uf: {
              type: 'string',
              nullable: true,
              example: 'GO',
            },
            categoria: {
              type: 'string',
              example: 'Tecnologia',
            },
            status: {
              type: 'string',
              enum: ['ATIVO', 'INATIVO'],
              example: 'ATIVO',
            },
            dataCadastro: {
              type: 'string',
              format: 'date-time',
            },
            dataAtualizacao: { type: 'string', format: 'date-time' },
          },
        },
        FornecedorInput: {
          type: 'object',
          required: ['razaoSocial', 'cnpj', 'telefone', 'email', 'categoria'],
          properties: {
            razaoSocial: { type: 'string', example: 'Empresa Exemplo LTDA' },
            nomeFantasia: { type: 'string', nullable: true, example: 'Empresa Exemplo' },
            cnpj: { type: 'string', example: '12345678000199' },
            telefone: { type: 'string', example: '(62) 99999-9999' },
            email: { type: 'string', format: 'email', example: 'contato@empresa.com' },
            cep: { type: 'string', nullable: true, example: '74000000' },
            rua: { type: 'string', nullable: true, example: 'Avenida Brasil' },
            bairro: { type: 'string', nullable: true, example: 'Setor Central' },
            numero: { type: 'string', nullable: true, example: '100' },
            complemento: { type: 'string', nullable: true, example: 'Sala 10' },
            cidade: { type: 'string', nullable: true, example: 'Goiânia' },
            uf: { type: 'string', nullable: true, example: 'GO' },
            categoria: { type: 'string', example: 'Tecnologia' },
          },
        },
        ErroPadrao: {
          type: 'object',
          properties: {
            status: { type: 'integer', example: 400 },
            mensagem: { type: 'string', example: 'CNPJ inválido' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
