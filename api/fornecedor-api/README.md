# API - Módulo Fornecedor

API REST para o gerenciamento de fornecedores, desenvolvida como projeto acadêmico exclusivamente em **JavaScript** (Node.js + Express + MySQL).

## 1. Objetivo

Permitir o gerenciamento completo de fornecedores:

* Cadastrar fornecedor
* Listar fornecedores
* Consultar fornecedor por ID
* Consultar fornecedor por CNPJ
* Atualizar fornecedor
* Inativar fornecedor
* Reativar fornecedor
* Excluir fornecedor
* Validar os dados recebidos
* Impedir CNPJ duplicado

## 2. Tecnologias

* Node.js
* Express.js
* MySQL (via `mysql2`)
* npm
* Swagger / OpenAPI (`swagger-jsdoc` + `swagger-ui-express`)
* Jest + Supertest (testes automatizados)

Arquitetura em camadas: `routes` → `controllers` → `services` → `repositories`, com `models` e `middlewares` de apoio.

```text
fornecedor-api/

│
├── src/
│   ├── config/
│   │   ├── database.js       # pool de conexão MySQL
│   │   └── swagger.js        # configuração do Swagger/OpenAPI
│   ├── controllers/
│   │   └── fornecedorController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validarFornecedor.js
│   ├── models/
│   │   ├── AppError.js
│   │   └── Fornecedor.js
│   ├── repositories/
│   │   └── fornecedorRepository.js
│   ├── routes/
│   │   └── fornecedorRoutes.js
│   ├── services/
│   │   └── fornecedorService.js
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── fornecedor.test.js
│
├── database.sql
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 3. Requisitos

* Node.js 18 ou superior
* MySQL 8 (ou compatível) instalado e em execução
* npm

## 4. Instalação do Node.js

Baixe e instale em:

https://nodejs.org/

Verifique a instalação:

```bash
node -v
npm -v
```

## 5. Instalação das dependências

Dentro da pasta `fornecedor-api`:

```bash
npm install
```

## 6. Configuração do MySQL

1. Certifique-se de que o serviço do MySQL está em execução.

2. Execute o script `database.sql`, que cria o banco `fornecedor`, a tabela `fornecedores`, os índices, as constraints e os dados de exemplo:

```bash
mysql -u root -p < database.sql
```

Isso cria automaticamente o banco `fornecedor` — não é necessário criá-lo manualmente antes.

### Estrutura dos dados do fornecedor

A tabela `fornecedores` possui os seguintes campos:

| Campo              | Tipo         | Obrigatório | Descrição                         |
| ------------------ | ------------ | ----------- | --------------------------------- |
| `id_fornecedor`    | INT          | Sim         | Identificador único do fornecedor |
| `razao_social`     | VARCHAR(150) | Sim         | Razão social da empresa           |
| `nome_fantasia`    | VARCHAR(150) | Não         | Nome fantasia                     |
| `cnpj`             | CHAR(14)     | Sim         | CNPJ do fornecedor                |
| `telefone`         | VARCHAR(20)  | Sim         | Telefone de contato               |
| `email`            | VARCHAR(150) | Sim         | E-mail de contato                 |
| `cep`              | VARCHAR(9)   | Não         | CEP do fornecedor                 |
| `rua`              | VARCHAR(150) | Não         | Rua, avenida ou logradouro        |
| `bairro`           | VARCHAR(100) | Não         | Bairro                             |
| `numero`           | VARCHAR(20)  | Não         | Número do endereço                 |
| `complemento`      | VARCHAR(100) | Não         | Complemento do endereço            |
| `cidade`           | VARCHAR(100) | Não         | Cidade                            |
| `uf`               | VARCHAR(2)   | Não         | Unidade Federativa                |
| `categoria`        | VARCHAR(100) | Sim         | Categoria/segmento do fornecedor  |
| `status`           | ENUM         | Sim         | `ATIVO` ou `INATIVO`              |
| `data_cadastro`    | DATETIME     | Sim         | Data de cadastro                  |
| `data_atualizacao` | DATETIME     | Sim         | Data da última atualização        |

Os campos `status`, `data_cadastro` e `data_atualizacao` são controlados automaticamente pelo banco de dados.

## 7. Configuração do `.env`

Copie o arquivo de exemplo e ajuste os valores conforme seu ambiente:

```bash
cp .env.example .env
```

Edite `.env` com as credenciais do seu MySQL:

```text
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fornecedor
DB_USER=root
DB_PASSWORD=SUA_SENHA
PORT=3000
DB_NAME_TEST=fornecedor_test
```

> `DB_NAME_TEST` é usado apenas ao rodar `npm test`. Se não quiser um banco separado para testes, basta deixá-lo igual a `DB_NAME` — os testes limpam a tabela `fornecedores` antes/depois de cada caso.

## 8. Execução da API

```bash
npm start
```

Saída esperada:

```text
Conexão com o MySQL estabelecida com sucesso.
Servidor rodando em http://localhost:3000
Documentação Swagger disponível em http://localhost:3000/api-docs
```

Para desenvolvimento com reinício automático (usa `nodemon`):

```bash
npm run dev
```

## 9. Execução dos testes

```bash
npm test
```

Os testes usam Jest + Supertest e cobrem:

* cadastro válido
* campos obrigatórios ausentes
* CNPJ inválido
* CNPJ duplicado
* listagem
* consulta por ID
* fornecedor inexistente
* atualização
* inativação
* reativação
* exclusão

> Os testes acessam o banco configurado em `.env` (`DB_NAME_TEST` ou `DB_NAME`) e limpam a tabela `fornecedores` a cada execução — não rode os testes apontando para um banco de produção com dados importantes.

## 10. Acesso ao Swagger

Com a API em execução, acesse:

```text
http://localhost:3000/api-docs
```

Lá é possível visualizar e testar todos os endpoints diretamente pelo navegador.

## 11. Endpoints

| Método | Rota                             | Descrição                    |
| ------ | -------------------------------- | ---------------------------- |
| POST   | `/api/fornecedores`              | Cadastra um novo fornecedor  |
| GET    | `/api/fornecedores`              | Lista todos os fornecedores  |
| GET    | `/api/fornecedores/:id`          | Consulta fornecedor por ID   |
| GET    | `/api/fornecedores/cnpj/:cnpj`   | Consulta fornecedor por CNPJ |
| PUT    | `/api/fornecedores/:id`          | Atualiza um fornecedor       |
| PATCH  | `/api/fornecedores/:id/inativar` | Inativa um fornecedor        |
| PATCH  | `/api/fornecedores/:id/reativar` | Reativa um fornecedor        |
| DELETE | `/api/fornecedores/:id`          | Exclui um fornecedor         |

## 12. Exemplos de requisições

> Observação: os CNPJs inseridos pelo `database.sql` são fictícios e usados apenas para demonstrar a listagem. Para **cadastrar** um fornecedor pela API, use um CNPJ com dígitos verificadores matematicamente válidos.

### Cadastrar fornecedor

```bash
curl -X POST http://localhost:3000/api/fornecedores \
  -H "Content-Type: application/json" \
  -d '{
    "razaoSocial": "Empresa Exemplo LTDA",
    "nomeFantasia": "Empresa Exemplo",
    "cnpj": "12345678000195",
    "telefone": "(62) 99999-9999",
    "email": "contato@empresa.com",
    "cep": "74000000",
    "rua": "Avenida Brasil",
    "bairro": "Setor Central",
    "numero": "100",
    "complemento": "Sala 10",
    "cidade": "Goiânia",
    "uf": "GO",
    "categoria": "Tecnologia"
  }'
```

Resposta (HTTP 201):

```json
{
  "id": 6,
  "razaoSocial": "Empresa Exemplo LTDA",
  "nomeFantasia": "Empresa Exemplo",
  "cnpj": "12345678000195",
  "telefone": "(62) 99999-9999",
  "email": "contato@empresa.com",
  "cep": "74000000",
  "rua": "Avenida Brasil",
  "bairro": "Setor Central",
  "numero": "100",
  "complemento": "Sala 10",
  "cidade": "Goiânia",
  "uf": "GO",
  "categoria": "Tecnologia",
  "status": "ATIVO",
  "dataCadastro": "2026-09-15 10:00:00",
  "dataAtualizacao": "2026-09-15 10:00:00"
}
```

### Listar fornecedores

```bash
curl http://localhost:3000/api/fornecedores
```

### Consultar por ID

```bash
curl http://localhost:3000/api/fornecedores/1
```

### Consultar por CNPJ

```bash
curl http://localhost:3000/api/fornecedores/cnpj/12345678000190
```

### Atualizar fornecedor

```bash
curl -X PUT http://localhost:3000/api/fornecedores/6 \
  -H "Content-Type: application/json" \
  -d '{
    "razaoSocial": "Empresa Exemplo Atualizada LTDA",
    "nomeFantasia": "Empresa Exemplo Atualizada",
    "cnpj": "12345678000195",
    "telefone": "(62) 98888-8888",
    "email": "
```
