const subtitulo = document.getElementById("subtitulo");
const topoAcoes = document.getElementById("topoAcoes");
const detalhesCard = document.getElementById("detalhesCard");
const mensagem = document.getElementById("mensagem");
const botaoEditar = document.getElementById("botaoEditar");
const botaoStatus = document.getElementById("botaoStatus");
const botaoExcluir = document.getElementById("botaoExcluir");
const botaoAtualizar = document.getElementById("botaoAtualizar");

const idFornecedor = Number(new URLSearchParams(window.location.search).get("id"));
let fornecedor = null;

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + (tipo || "");
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function formatarCep(cep) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function nomeExibicao(f) {
  return f.nome_fantasia || f.razao_social;
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo GET real em http://localhost:3000/api/fornecedores/:id.
// Os nomes rua/numero/complemento/bairro ainda precisam ser confirmados com o Dev 3.
async function buscarFornecedorPorId(id) {
  const dados = [
    { id_fornecedor: 1, razao_social: "Empresa Alfa Comercio e Servicos Ltda", nome_fantasia: "Alfa Comercio", cnpj: "12345678000190", telefone: "(62) 3333-1000", email: "contato@empresaalfa.com.br", cep: "74000000", rua: "Rua 10", numero: "100", complemento: "Sala 1", bairro: "Setor Central", cidade: "Goiania", uf: "GO", categoria: "Comercio", status: "ATIVO" },
    { id_fornecedor: 2, razao_social: "Beta Tecnologia Ltda", nome_fantasia: "Beta Tech", cnpj: "23456789000101", telefone: "(62) 3222-2000", email: "contato@betatecnologia.com.br", cep: "74110000", rua: "Avenida T-4", numero: "250", complemento: "", bairro: "Setor Bueno", cidade: "Goiania", uf: "GO", categoria: "Tecnologia", status: "ATIVO" },
    { id_fornecedor: 3, razao_social: "Gamma Materiais de Escritorio Ltda", nome_fantasia: "Gamma Materiais", cnpj: "34567890000112", telefone: "(62) 3444-3000", email: "vendas@gammamateriais.com.br", cep: "74150000", rua: "Rua 9", numero: "35", complemento: "Loja 2", bairro: "Setor Oeste", cidade: "Goiania", uf: "GO", categoria: "Materiais de Escritorio", status: "ATIVO" },
    { id_fornecedor: 4, razao_social: "Delta Servicos Gerais Ltda", nome_fantasia: "Delta Servicos", cnpj: "45678901000123", telefone: "(62) 3555-4000", email: "contato@deltaservicos.com.br", cep: "74210000", rua: "Avenida 85", numero: "1200", complemento: "", bairro: "Setor Marista", cidade: "Goiania", uf: "GO", categoria: "Servicos", status: "INATIVO" },
    { id_fornecedor: 5, razao_social: "Epsilon Distribuidora Ltda", nome_fantasia: "Epsilon", cnpj: "56789012000134", telefone: "(62) 3666-5000", email: "vendas@epsilondistribuidora.com.br", cep: "74310000", rua: "Rua C-137", numero: "48", complemento: "Galpao 3", bairro: "Jardim America", cidade: "Goiania", uf: "GO", categoria: "Distribuicao", status: "ATIVO" },
  ];
  return dados.find((f) => f.id_fornecedor === id) || null;
}

// PONTO DE INTEGRAÇÃO (Dev 2): PATCH /api/fornecedores/:id/inativar ou /reativar.
async function alterarStatusFornecedor(id, novoStatus) {
  if (fornecedor) fornecedor.status = novoStatus;
  return { ok: true };
}

// PONTO DE INTEGRAÇÃO (Dev 2): DELETE /api/fornecedores/:id.
async function excluirFornecedor(id) {
  return { ok: true };
}

function preencherTela() {
  const texto = (valor) => valor || "—";

  subtitulo.textContent = `Visualize as informações cadastradas de ${nomeExibicao(fornecedor)}.`;
  document.getElementById("razaoSocial").textContent = texto(fornecedor.razao_social);
  document.getElementById("cnpj").textContent = formatarCnpj(fornecedor.cnpj);
  document.getElementById("nomeFantasia").textContent = texto(fornecedor.nome_fantasia);
  document.getElementById("categoria").textContent = texto(fornecedor.categoria);
  document.getElementById("email").textContent = texto(fornecedor.email);
  document.getElementById("telefone").textContent = texto(fornecedor.telefone);
  document.getElementById("cep").textContent = fornecedor.cep ? formatarCep(fornecedor.cep) : "—";
  document.getElementById("rua").textContent = texto(fornecedor.rua);
  document.getElementById("numero").textContent = texto(fornecedor.numero);
  document.getElementById("complemento").textContent = texto(fornecedor.complemento);
  document.getElementById("bairro").textContent = texto(fornecedor.bairro);
  document.getElementById("cidadeUf").textContent =
    fornecedor.cidade && fornecedor.uf ? `${fornecedor.cidade} / ${fornecedor.uf}` : texto(fornecedor.cidade || fornecedor.uf);

  botaoStatus.textContent =
    fornecedor.status === "ATIVO" ? "⊘ Inativar fornecedor" : "⊘ Ativar fornecedor";

  topoAcoes.hidden = false;
  detalhesCard.hidden = false;
}

async function carregar() {
  mostrarMensagem("", "");

  if (!idFornecedor) {
    subtitulo.textContent = "Nenhum fornecedor selecionado.";
    mostrarMensagem("Abra esta tela a partir da listagem de fornecedores.", "erro");
    return;
  }

  try {
    fornecedor = await buscarFornecedorPorId(idFornecedor);
  } catch (erro) {
    subtitulo.textContent = "Não foi possível carregar o fornecedor.";
    mostrarMensagem("Erro ao buscar os dados. Tente atualizar a página.", "erro");
    return;
  }

  if (!fornecedor) {
    subtitulo.textContent = "Fornecedor não encontrado.";
    mostrarMensagem("Esse fornecedor não existe ou foi excluído.", "erro");
    return;
  }

  preencherTela();
}

botaoEditar.addEventListener("click", () => {
  window.location.href = `fornecedor-edicao.html?id=${fornecedor.id_fornecedor}`;
});

botaoStatus.addEventListener("click", async () => {
  const vaiInativar = fornecedor.status === "ATIVO";

  const confirmou = await confirmarAcao(
    vaiInativar
      ? {
          titulo: "Inativar fornecedor?",
          texto: "Tem certeza que deseja inativar este fornecedor? O fornecedor não ficará disponível para novas operações enquanto estiver inativo. O histórico será mantido.",
          textoBotao: "Inativar fornecedor",
        }
      : {
          titulo: "Ativar fornecedor?",
          texto: "Tem certeza que deseja ativar este fornecedor? O fornecedor ficará disponível para novas operações enquanto estiver ativo.",
          textoBotao: "Ativar fornecedor",
        }
  );
  if (!confirmou) return;

  const novoStatus = vaiInativar ? "INATIVO" : "ATIVO";
  await alterarStatusFornecedor(fornecedor.id_fornecedor, novoStatus);
  preencherTela();
  mostrarMensagem(vaiInativar ? "Fornecedor inativado." : "Fornecedor ativado.", "sucesso");
});

botaoExcluir.addEventListener("click", async () => {
  const confirmou = await confirmarAcao({
    titulo: "Excluir fornecedor?",
    texto: "Tem certeza que deseja excluir este fornecedor? O fornecedor será excluído permanentemente.",
    textoBotao: "Excluir",
  });
  if (!confirmou) return;

  await excluirFornecedor(fornecedor.id_fornecedor);
  mostrarMensagem("Fornecedor excluído. Voltando para a listagem...", "sucesso");
  topoAcoes.hidden = true;
  setTimeout(() => {
    window.location.href = "fornecedor-listagem.html";
  }, 1200);
});

botaoAtualizar.addEventListener("click", carregar);

carregar();