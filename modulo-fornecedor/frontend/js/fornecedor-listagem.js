const campoBusca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtroStatus");
const corpoTabela = document.getElementById("corpoTabela");
const mensagem = document.getElementById("mensagem");

let fornecedores = [];

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + (tipo || "");
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo GET real em http://localhost:3000/api/fornecedores
// (ver contrato em api/fornecedor-api/README.md). A resposta da API vem
// com os nomes de coluna do banco (snake_case: razao_social, nome_fantasia,
// id_fornecedor etc.), por isso os campos abaixo já seguem esse padrão.
async function listarFornecedores() {
  return [
    { id_fornecedor: 1, razao_social: "Empresa Alfa Comercio e Servicos Ltda", nome_fantasia: "Alfa Comercio e Servicos", cnpj: "12345678000190", telefone: "(62) 3333-1000", email: "contato@empresaalfa.com.br", cidade: "Goiania", uf: "GO", categoria: "Comercio", status: "ATIVO" },
    { id_fornecedor: 2, razao_social: "Beta Tecnologia Ltda", nome_fantasia: "Beta Tecnologia", cnpj: "23456789000101", telefone: "(62) 3222-2000", email: "contato@betatecnologia.com.br", cidade: "Goiania", uf: "GO", categoria: "Tecnologia", status: "ATIVO" },
    { id_fornecedor: 3, razao_social: "Gamma Materiais de Escritorio Ltda", nome_fantasia: "Gamma Materiais", cnpj: "34567890000112", telefone: "(62) 3444-3000", email: "vendas@gammamateriais.com.br", cidade: "Goiania", uf: "GO", categoria: "Materiais de Escritorio", status: "ATIVO" },
    { id_fornecedor: 4, razao_social: "Delta Servicos Gerais Ltda", nome_fantasia: "Delta Servicos", cnpj: "45678901000123", telefone: "(62) 3555-4000", email: "contato@deltaservicos.com.br", cidade: "Goiania", uf: "GO", categoria: "Servicos", status: "INATIVO" },
    { id_fornecedor: 5, razao_social: "Epsilon Distribuidora Ltda", nome_fantasia: "Epsilon Distribuidora", cnpj: "56789012000134", telefone: "(62) 3666-5000", email: "vendas@epsilondistribuidora.com.br", cidade: "Goiania", uf: "GO", categoria: "Distribuicao", status: "ATIVO" },
  ];
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo PATCH real em /api/fornecedores/{id}/inativar ou /reativar.
async function alterarStatusFornecedor(id, novoStatus) {
  const fornecedor = fornecedores.find((f) => f.id_fornecedor === id);
  if (fornecedor) fornecedor.status = novoStatus;
  return { ok: true };
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo DELETE real em /api/fornecedores/{id}.
async function excluirFornecedor(id) {
  fornecedores = fornecedores.filter((f) => f.id_fornecedor !== id);
  return { ok: true };
}

function fornecedoresFiltrados() {
  const termo = campoBusca.value.trim().toLowerCase();
  const termoCnpj = termo.replace(/\D/g, "");
  const status = filtroStatus.value;

  return fornecedores.filter((f) => {
    const bateBusca =
      !termo ||
      f.razao_social.toLowerCase().includes(termo) ||
      (termoCnpj && f.cnpj.includes(termoCnpj));
    const bateStatus = !status || f.status === status;
    return bateBusca && bateStatus;
  });
}

function renderizarTabela() {
  const lista = fornecedoresFiltrados();
  corpoTabela.innerHTML = "";

  if (lista.length === 0) {
    mostrarMensagem("Nenhum fornecedor encontrado.", "info");
    return;
  }

  mostrarMensagem("", "");

  lista.forEach((f) => {
    const tr = document.createElement("tr");

    const statusClasse = f.status === "ATIVO" ? "ativo" : "inativo";
    const acaoStatusTexto = f.status === "ATIVO" ? "Inativar" : "Reativar";
    const novoStatus = f.status === "ATIVO" ? "INATIVO" : "ATIVO";

    tr.innerHTML = `
      <td>${f.razao_social}</td>
      <td>${formatarCnpj(f.cnpj)}</td>
      <td>${f.telefone}</td>
      <td>${f.cidade ? f.cidade + "/" + f.uf : "-"}</td>
      <td>${f.categoria}</td>
      <td><span class="badge ${statusClasse}">${f.status}</span></td>
      <td class="acoes">
        <button type="button" data-acao="status" data-id="${f.id_fornecedor}" data-novo-status="${novoStatus}">${acaoStatusTexto}</button>
        <button type="button" class="excluir" data-acao="excluir" data-id="${f.id_fornecedor}">Excluir</button>
      </td>
    `;

    corpoTabela.appendChild(tr);
  });
}

corpoTabela.addEventListener("click", async (evento) => {
  const botao = evento.target.closest("button");
  if (!botao) return;

  const id = Number(botao.dataset.id);

  if (botao.dataset.acao === "status") {
    const novoStatus = botao.dataset.novoStatus;
    await alterarStatusFornecedor(id, novoStatus);
    renderizarTabela();
  }

  if (botao.dataset.acao === "excluir") {
    const confirmou = confirm("Excluir este fornecedor? Essa ação não pode ser desfeita.");
    if (!confirmou) return;
    await excluirFornecedor(id);
    renderizarTabela();
  }
});

campoBusca.addEventListener("input", renderizarTabela);
filtroStatus.addEventListener("change", renderizarTabela);

(async function iniciar() {
  mostrarMensagem("Carregando fornecedores...", "info");
  try {
    fornecedores = await listarFornecedores();
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem("Não foi possível carregar os fornecedores.", "erro");
  }
})();