require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await testConnection();
    console.log('Conexão com o MySQL estabelecida com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Falha ao conectar no MySQL. Verifique as variáveis de ambiente (.env).');
    console.error(err.message);
    process.exit(1);
  }
}

iniciar();
