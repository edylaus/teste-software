# Módulo Fornecedor

## 1. Sobre o projeto

Projeto acadêmico para desenvolvimento do **Módulo Fornecedor**, responsável pelo cadastro e gerenciamento das informações de fornecedores.

O módulo permite:

- Cadastrar fornecedores;
- Consultar fornecedores;
- Editar e atualizar fornecedores;
- Inativar fornecedores;
- Reativar fornecedores;
- Excluir fornecedores, conforme as regras definidas;
- Validar os dados informados;
- Controlar o acesso dos usuários conforme suas permissões.

## 2. Objetivo

Centralizar e organizar as informações dos fornecedores, permitindo que usuários autorizados realizem o cadastro, consulta e manutenção dos dados de forma organizada.

O módulo busca reduzir problemas relacionados a dados desatualizados, cadastros duplicados, dificuldade para localizar informações, erros em consultas e atualizações e duplicidade de trabalho.

## 3. Tecnologias

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- JavaScript
- Node.js
- Express.js

### Banco de dados
- MySQL

### Controle de versão
- Git
- GitHub

## 4. Estrutura do projeto

~~~text
modulo-fornecedor/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── app.js
│   │
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── schema.sql
│   ├── inserts.sql
│   └── README.md
│
└── docs/
    ├── requisitos/
    ├── diagramas/
    ├── prototipos/
    └── testes/
~~~

## 5. Frontend

A pasta `frontend/` contém a interface da aplicação.

Funcionalidades previstas:

- Tela de login;
- Tela principal;
- Listagem de fornecedores;
- Cadastro de fornecedor;
- Consulta de fornecedor;
- Edição de fornecedor;
- Inativação e reativação;
- Exclusão;
- Mensagens de sucesso e erro;
- Validação dos campos.

## 6. Backend

A pasta `backend/` contém a API responsável pela comunicação entre o frontend e o banco de dados.

A API utiliza **JavaScript, Node.js, Express.js e MySQL**.

### Organização

~~~text
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   └── app.js
│
├── tests/
├── package.json
└── .env.example
~~~

### Responsabilidade das pastas

- **controllers/** — processamento das requisições e respostas da API.
- **routes/** — definição das rotas/endpoints.
- **services/** — regras e operações da aplicação.
- **models/** — representação e acesso aos dados.
- **middlewares/** — autenticação, autorização e validações.
- **config/** — configurações da aplicação e conexão com o banco.
- **tests/** — testes relacionados ao backend.

## 7. Banco de dados

O banco utilizado pelo projeto é o **MySQL**.

Os scripts ficam em:

~~~text
database/
├── schema.sql
├── inserts.sql
└── README.md
~~~

### schema.sql

Contém a criação da estrutura do banco, incluindo tabelas, chaves, índices, constraints e demais definições necessárias.

### inserts.sql

Contém dados fictícios para desenvolvimento e testes.

## 8. Cadastro de fornecedores

Os dados previstos para o cadastro incluem:

- ID do fornecedor;
- Razão Social/Nome;
- CNPJ;
- Endereço;
- Telefone;
- E-mail;
- Segmento;
- Status (ativo/inativo).

O CNPJ deve possuir regra de unicidade para evitar cadastros duplicados.

Os campos obrigatórios e demais regras de validação devem seguir o levantamento de requisitos aprovado pela equipe.

## 9. Usuários e autenticação

O sistema possui controle de usuários para permitir acesso às funcionalidades conforme as permissões definidas.

### Perfis

- `ADMIN`
- `OPERADOR`
- `LEITURA`

### Status

- `ATIVO`
- `INATIVO`
- `BLOQUEADO`

As credenciais não devem ser armazenadas em texto puro. As senhas devem ser armazenadas utilizando mecanismo de hash apropriado.

## 10. Funcionalidades do módulo

### RF01 — Cadastro

Permitir o cadastro de novos fornecedores, realizando a validação dos dados antes do armazenamento.

### RF02 — Consulta

Permitir a consulta de fornecedores por informações como:

- CNPJ;
- Razão Social/Nome;
- Segmento.

### RF03 — Edição/Atualização

Permitir que usuários autorizados alterem os dados de um fornecedor.

### RF04 — Inativação

Permitir a inativação de fornecedores, mantendo seus registros para consulta e preservação do histórico.

### RF05 — Remoção/Exclusão

Permitir a remoção de fornecedores conforme as regras de negócio e permissões definidas.

## 11. Regras gerais

O sistema deve:

- Validar os dados antes de salvar;
- Impedir cadastros duplicados;
- Validar informações obrigatórias;
- Respeitar as permissões dos usuários;
- Manter a integridade dos dados;
- Permitir a manutenção das informações dos fornecedores;
- Informar ao usuário quando uma operação for concluída ou apresentar erro.

As regras de negócio definitivas devem seguir a documentação de requisitos validada pela equipe.

## 12. Integração

A comunicação da aplicação seguirá:

~~~text
Frontend
   │
   ▼
API / Backend
   │
   ▼
MySQL
~~~

O frontend realiza requisições para a API. A API processa as requisições, aplica as regras necessárias e realiza as operações no banco de dados. O resultado é retornado ao frontend.

## 13. Desenvolvimento em equipe

O desenvolvimento será realizado de forma colaborativa utilizando Git e GitHub.

Os desenvolvedores são responsáveis principalmente pela implementação da aplicação, enquanto os demais participantes podem atuar em:

- Levantamento e validação de requisitos;
- UX/UI;
- Modelagem;
- Testes;
- Validação;
- Homologação;
- Documentação.

As atividades devem ser acompanhadas pelo Trello e as alterações de código devem ser versionadas no Git.

## 14. Fluxo de desenvolvimento

~~~text
Backlog
   ↓
Análise
   ↓
Modelagem/Protótipo
   ↓
Desenvolvimento
   ↓
Testes
   ↓
Correções
   ↓
Concluído
~~~

## 15. Branches

A branch principal é:

~~~text
main
~~~

Para novas funcionalidades, recomenda-se utilizar branches específicas.

Exemplos:

~~~text
feature/frontend
feature/login
feature/fornecedores
feature/integracao-api
feature/database
fix/validacao-cnpj
fix/login
~~~

Após a conclusão e validação da funcionalidade, as alterações devem ser integradas à branch principal conforme o fluxo definido pela equipe.

## 16. Commits

Os commits devem ser objetivos e descrever claramente a alteração realizada.

Exemplos:

~~~text
feat: cria tela de cadastro de fornecedor
feat: adiciona consulta de fornecedores
feat: integra login com API
feat: adiciona validação de CNPJ
fix: corrige validação do cadastro
fix: corrige consulta de fornecedor
docs: atualiza documentação
test: adiciona testes do cadastro
~~~

Evitar mensagens genéricas como:

~~~text
alteração
teste
mudanças
final
versão nova
~~~

## 17. Boas práticas

- Não realizar alterações diretamente na `main` sem necessidade;
- Criar branches para novas funcionalidades;
- Fazer commits pequenos e objetivos;
- Não enviar senhas ou credenciais para o Git;
- Não versionar arquivos `.env` com informações reais;
- Utilizar `.env.example` para demonstrar as variáveis necessárias;
- Testar as alterações antes de enviá-las;
- Manter o código organizado;
- Evitar modificar código de outro integrante sem alinhamento;
- Atualizar a documentação quando uma alteração relevante for realizada.

## 18. Configuração do ambiente

### Requisitos

- Node.js;
- npm;
- MySQL;
- Git;
- Navegador web.

### Clonar o projeto

~~~bash
git clone URL_DO_REPOSITORIO
~~~

Entrar na pasta:

~~~bash
cd modulo-fornecedor
~~~

## 19. Configuração do Backend

Entrar na pasta:

~~~bash
cd backend
~~~

Instalar as dependências:

~~~bash
npm install
~~~

Criar o arquivo `.env` utilizando como referência:

~~~text
.env.example
~~~

Configurar as informações necessárias para conexão com o MySQL.

Executar o backend utilizando o comando definido no `package.json`.

Exemplos:

~~~bash
npm start
~~~

ou:

~~~bash
npm run dev
~~~

## 20. Configuração do banco

Criar a estrutura do banco utilizando:

~~~text
database/schema.sql
~~~

Depois, caso necessário, inserir dados de teste utilizando:

~~~text
database/inserts.sql
~~~

As configurações de acesso ao banco devem ser informadas no arquivo `.env` do backend.

## 21. Testes

Os testes devem verificar as funcionalidades implementadas e os requisitos definidos para o módulo.

Cenários a serem considerados:

- Login válido;
- Login inválido;
- Usuário sem permissão;
- Cadastro válido;
- Cadastro com campos obrigatórios vazios;
- Cadastro com CNPJ inválido;
- Cadastro de CNPJ já existente;
- Consulta de fornecedor;
- Edição de fornecedor;
- Inativação;
- Reativação;
- Exclusão;
- Tratamento de erros;
- Integração entre frontend, API e banco.

Materiais e evidências de testes podem ser armazenados em:

~~~text
docs/testes/
~~~

## 22. Documentação

Os documentos relacionados ao projeto devem ser organizados em:

~~~text
docs/
├── requisitos/
├── diagramas/
├── prototipos/
└── testes/
~~~

### requisitos/

Documentação do levantamento e análise dos requisitos.

### diagramas/

Diagramas utilizados para representar a estrutura e o funcionamento do sistema.

### prototipos/

Protótipos e materiais relacionados à UX/UI.

### testes/

Casos de teste, evidências e resultados dos testes realizados.

## 23. Trello

O Trello será utilizado para acompanhamento das atividades do projeto.

As principais etapas são:

~~~text
📋 Backlog
🔎 Análise
🎨 Modelagem/Protótipo
💻 Desenvolvimento
🧪 Testes
🔧 Correções
✅ Concluído
~~~

Cada atividade deve avançar pelas etapas conforme seu desenvolvimento.

## 24. Projeto acadêmico

Este repositório faz parte do desenvolvimento acadêmico do **Módulo Fornecedor**.

O projeto contempla as etapas de:

1. Levantamento de requisitos;
2. Análise;
3. Modelagem;
4. Desenvolvimento;
5. Integração;
6. Testes;
7. Correções;
8. Homologação;
9. Documentação.

O conteúdo deste repositório deve permanecer alinhado aos requisitos e decisões definidos pela equipe durante o desenvolvimento.
