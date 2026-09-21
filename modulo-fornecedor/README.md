Módulo Fornecedor

Projeto desenvolvido para o Projeto Integrador, com o objetivo de desenvolver uma aplicação para cadastro e gerenciamento de fornecedores.

O sistema permitirá realizar operações de cadastro, consulta, atualização, inativação, reativação e exclusão de fornecedores, além de possuir autenticação de usuários por meio de uma tela de login.

🎯 Objetivo

Centralizar as informações dos fornecedores, permitindo que os usuários autorizados realizem o gerenciamento dos dados de forma organizada.

A aplicação será desenvolvida utilizando JavaScript, com integração entre o frontend, a API REST já desenvolvida e o banco de dados MySQL.

🛠️ Tecnologias
JavaScript
Node.js
Express.js
MySQL
API REST
HTML
CSS
Git
GitHub
📁 Estrutura do Projeto
modulo-fornecedor/
│
├── frontend/
│   └── Código da aplicação
│
├── database/
│   └── Scripts SQL
│
├── docs/
│   └── Documentação do projeto
│
└── README.md
🔐 Autenticação

A aplicação possuirá uma tela de login para autenticação dos usuários.

A estrutura de usuários contempla:

Nome
E-mail
Login
Senha armazenada como hash
Perfil
Status
Último login
Tentativas de login
Data de cadastro
Data de atualização
Perfis
ADMIN
OPERADOR
LEITURA
Status
ATIVO
INATIVO
BLOQUEADO

A autenticação será realizada através da API.

🏢 Módulo Fornecedor

O módulo deverá permitir:

Cadastro de fornecedores
Consulta de fornecedores
Consulta por ID
Consulta por CNPJ
Atualização de fornecedores
Inativação
Reativação
Exclusão
Dados do fornecedor
ID
Razão Social/Nome
CNPJ
Endereço
Telefone
E-mail
Segmento
Status
Data de cadastro
Data de atualização
🔌 API

A aplicação utilizará uma API REST desenvolvida em JavaScript, Node.js e Express.js.

Autenticação
POST /api/auth/login
Usuários
POST   /api/usuarios
GET    /api/usuarios
GET    /api/usuarios/:id
PUT    /api/usuarios/:id
PATCH  /api/usuarios/:id/inativar
PATCH  /api/usuarios/:id/reativar
PATCH  /api/usuarios/:id/desbloquear
DELETE /api/usuarios/:id
Fornecedores
POST   /api/fornecedores
GET    /api/fornecedores
GET    /api/fornecedores/:id
GET    /api/fornecedores/cnpj/:cnpj
PUT    /api/fornecedores/:id
PATCH  /api/fornecedores/:id/inativar
PATCH  /api/fornecedores/:id/reativar
DELETE /api/fornecedores/:id
🗄️ Banco de Dados

O projeto utiliza MySQL.

As principais tabelas são:

usuarios
fornecedores

Os scripts do banco devem ser mantidos no diretório:

database/

Exemplo:

database/
├── database.sql
└── inserts.sql

O banco deverá possuir as restrições e validações necessárias para garantir a integridade dos dados.

🎨 Frontend

O frontend será desenvolvido em JavaScript e utilizará o protótipo UX/UI como referência.

Principais telas
Tela de Login
Tela principal
Listagem de fornecedores
Cadastro de fornecedor
Edição de fornecedor
Visualização de fornecedor
Inativação/Reativação
Exclusão
Mensagens de sucesso e erro

O frontend deverá consumir os endpoints disponibilizados pela API.

👨‍💻 Organização do Desenvolvimento

O desenvolvimento principal será realizado por três desenvolvedores.

Desenvolvedor 1 — Frontend

Responsável pelo desenvolvimento das telas e funcionalidades da aplicação.

Desenvolvedor 2 — Integração

Responsável pela integração entre frontend e API, autenticação, consumo dos endpoints e tratamento das respostas.

Desenvolvedor 3 — Banco de Dados

Responsável pela estrutura do MySQL, tabelas usuarios e fornecedores, scripts SQL, dados de teste e validação da integração com a API.

Participação dos demais integrantes

Os demais integrantes participarão ativamente das etapas de desenvolvimento por meio de:

Testes das funcionalidades;
Validação das telas;
Validação do UX/UI;
Verificação dos requisitos;
Identificação e registro de erros;
Testes de integração;
Revisão das funcionalidades;
Homologação da aplicação.

A participação da equipe ocorrerá durante o desenvolvimento, permitindo que as funcionalidades sejam avaliadas conforme forem implementadas.

🌿 Organização do Git

O desenvolvimento deverá utilizar branches para organizar as alterações.

Exemplo:

main
│
├── frontend
├── integracao
└── banco-dados

Cada desenvolvedor deverá realizar suas alterações na branch correspondente à sua atividade.

Após o desenvolvimento e os testes, as alterações deverão ser enviadas para o repositório e submetidas à revisão antes de serem integradas à branch main.

🔄 Fluxo de Desenvolvimento
Desenvolvimento
      ↓
Teste local
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Revisão
      ↓
Testes
      ↓
Merge
      ↓
main
📝 Padrão de Commits

Utilizar mensagens de commit claras e objetivas.

Exemplos
feat: cria tela de login
feat: adiciona cadastro de fornecedor
feat: integra consulta de fornecedores com API
feat: adiciona formulário de edição
fix: corrige validação do CNPJ
fix: corrige erro na autenticação
fix: corrige integração com API
test: adiciona testes do cadastro
test: valida fluxo de login
docs: atualiza documentação
Tipos de commit
feat — nova funcionalidade
fix — correção de erro
test — testes
docs — documentação
refactor — alteração estrutural sem mudança de funcionalidade
style — alterações de formatação ou estilo
⚠️ Boas Práticas
Não enviar senhas ou informações sensíveis para o repositório.
Não enviar o arquivo .env para o Git.
Utilizar .env.example para indicar as variáveis necessárias.
Não realizar alterações diretamente na main sem necessidade.
Criar commits pequenos e relacionados à alteração realizada.
Testar o código antes de realizar o commit.
Manter o código organizado.
Utilizar mensagens de commit claras.
Atualizar a branch antes de iniciar novas alterações.
Revisar o código antes do Pull Request.
Validar a integração antes do merge.
Não apagar ou alterar código de outro desenvolvedor sem alinhamento com a equipe.
🚀 Execução
1. Clonar o repositório
git clone URL_DO_REPOSITORIO
2. Acessar o projeto
cd modulo-fornecedor
3. Instalar as dependências
npm install
4. Configurar o banco de dados

Criar o banco de dados MySQL e executar os scripts disponíveis no diretório:

database/

O banco deverá possuir as tabelas:

usuarios
fornecedores
5. Configurar as variáveis de ambiente

Criar um arquivo .env na aplicação conforme as configurações necessárias.

Exemplo:

DB_HOST=localhost
DB_PORT=3306
DB_NAME=fornecedor
DB_USER=root
DB_PASSWORD=SUA_SENHA
PORT=3000

Não enviar o arquivo .env para o repositório.

6. Executar a aplicação
npm start
📚 Documentação

Os documentos, protótipos, diagramas, scripts e demais materiais relacionados ao projeto deverão ser mantidos no diretório:

docs/

Exemplo:

docs/
├── requisitos/
├── ux-ui/
├── diagramas/
└── testes/
🧪 Testes

Os testes deverão verificar as principais funcionalidades da aplicação.

Autenticação
Login válido
Login inválido
Usuário inexistente
Usuário inativo
Usuário bloqueado
Senha incorreta
Fornecedores
Cadastro
Consulta
Consulta por ID
Consulta por CNPJ
Atualização
Inativação
Reativação
Exclusão
Validação de campos
CNPJ duplicado
Integração

Também deverão ser realizados testes envolvendo o fluxo completo:

Login
  ↓
Frontend
  ↓
API
  ↓
MySQL
  ↓
Resposta
  ↓
Frontend
📋 Controle de Requisitos

As funcionalidades desenvolvidas deverão ser relacionadas aos requisitos definidos na documentação do projeto.

O objetivo é permitir a verificação da correspondência entre:

Requisito
    ↓
Funcionalidade
    ↓
Código
    ↓
Teste
    ↓
Homologação
🎓 Projeto Integrador

Projeto: Módulo Fornecedor

Tecnologia principal: JavaScript

Backend/API: Node.js + Express.js

Banco de Dados: MySQL

Frontend: JavaScript

Controle de Versão: Git / GitHub

Status: Em desenvolvimento
