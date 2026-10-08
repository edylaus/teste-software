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
  return f.nomeFantasia || f.razaoSocial;
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo GET real em http://localhost:3000/api/fornecedores/:id.
// Os nomes rua/numero/complemento/bairro ainda precisam ser confirmados com o Dev 3.
async function buscarFornecedorPorId(id) {
  const resposta = await fetch(`http://localhost:3000/api/fornecedores/${id}`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar fornecedor");
  }

  return resposta.json();
}

// PONTO DE INTEGRAÇÃO (Dev 2): PATCH /api/fornecedores/:id/inativar ou /reativar.
async function alterarStatusFornecedor(id, novoStatus) {
  const acao = novoStatus === "INATIVO" ? "inativar" : "reativar";

  const resposta = await fetch(`http://localhost:3000/api/fornecedores/${id}/${acao}`, {
    method: "PATCH",
  });

  if (!resposta.ok) {
    throw new Error("Erro ao alterar status do fornecedor");
  }

  return resposta.json();
}

// PONTO DE INTEGRAÇÃO (Dev 2): DELETE /api/fornecedores/:id.
async function excluirFornecedor(id) {
  const resposta = await fetch(`http://localhost:3000/api/fornecedores/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir fornecedor");
  }

  return { ok: true };
}

function preencherTela() {
  const texto = (valor) => valor || "—";

  subtitulo.textContent = `Visualize as informações cadastradas de ${nomeExibicao(fornecedor)}.`;
  document.getElementById("razaoSocial").textContent = texto(fornecedor.razaoSocial);
  document.getElementById("cnpj").textContent = formatarCnpj(fornecedor.cnpj);
  document.getElementById("nomeFantasia").textContent = texto(fornecedor.nomeFantasia);
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
  window.location.href = `fornecedor-edicao.html?id=${fornecedor.id}`;
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
  try {
    await alterarStatusFornecedor(fornecedor.id, novoStatus);
    fornecedor = await buscarFornecedorPorId(fornecedor.id);
    preencherTela();
    mostrarMensagem(vaiInativar ? "Fornecedor inativado." : "Fornecedor ativado.", "sucesso");
  } catch (erro) {
    mostrarMensagem("Não foi possível concluir a operação. Atualize a página para conferir o status.", "erro");
  }
});

botaoExcluir.addEventListener("click", async () => {
  const confirmou = await confirmarAcao({
    titulo: "Excluir fornecedor?",
    texto: "Tem certeza que deseja excluir este fornecedor? O fornecedor será excluído permanentemente.",
    textoBotao: "Excluir",
  });
  if (!confirmou) return;

    try {
    await excluirFornecedor(fornecedor.id);
    mostrarMensagem("Fornecedor excluído. Voltando para a listagem...", "sucesso");
    topoAcoes.hidden = true;
    setTimeout(() => {
      window.location.href = "fornecedor-listagem.html";
    }, 1200);
  } catch (erro) {
    mostrarMensagem("Não foi possível excluir o fornecedor. Tente novamente.", "erro");
  }
});

botaoAtualizar.addEventListener("click", carregar);

carregar();