const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger/OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota simples de verificação de saúde da aplicação
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rotas do módulo fornecedor
app.use('/api/fornecedores', fornecedorRoutes);

// Rotas de autenticação
app.use('/api', authRoutes);
// 404 para rotas não mapeadas
app.use(notFoundHandler);

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
