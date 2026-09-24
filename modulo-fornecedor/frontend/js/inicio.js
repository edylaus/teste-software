const totalFornecedores = document.getElementById("totalFornecedores");
const totalAtivos = document.getElementById("totalAtivos");
const totalInativos = document.getElementById("totalInativos");
const corpoRecentes = document.getElementById("corpoRecentes");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const mensagem = document.getElementById("mensagem");

const QUANTIDADE_RECENTES = 3;

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + (tipo || "");
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir pelo GET real em http://localhost:3000/api/fornecedores.
async function listarFornecedores() {
  return [
    { id_fornecedor: 1, razao_social: "Empresa Alfa Comercio e Servicos Ltda", cnpj: "12345678000190", email: "contato@empresaalfa.com.br", status: "ATIVO", data_cadastro: "2026-09-01T10:00:00" },
    { id_fornecedor: 2, razao_social: "Beta Tecnologia Ltda", cnpj: "23456789000101", email: "contato@betatecnologia.com.br", status: "ATIVO", data_cadastro: "2026-09-05T14:30:00" },
    { id_fornecedor: 3, razao_social: "Gamma Materiais de Escritorio Ltda", cnpj: "34567890000112", email: "vendas@gammamateriais.com.br", status: "ATIVO", data_cadastro: "2026-09-10T09:15:00" },
    { id_fornecedor: 4, razao_social: "Delta Servicos Gerais Ltda", cnpj: "45678901000123", email: "contato@deltaservicos.com.br", status: "INATIVO", data_cadastro: "2026-09-15T16:45:00" },
    { id_fornecedor: 5, razao_social: "Epsilon Distribuidora Ltda", cnpj: "56789012000134", email: "vendas@epsilondistribuidora.com.br", status: "ATIVO", data_cadastro: "2026-09-20T11:20:00" },
  ];
}

function renderizarResumo(fornecedores) {
  const ativos = fornecedores.filter((f) => f.status === "ATIVO").length;
  totalFornecedores.textContent = fornecedores.length;
  totalAtivos.textContent = ativos;
  totalInativos.textContent = fornecedores.length - ativos;
}

function renderizarRecentes(fornecedores) {
  corpoRecentes.innerHTML = "";

  if (fornecedores.length === 0) {
    corpoRecentes.innerHTML = `<tr><td colspan="4" class="linha-vazia">Nenhum fornecedor cadastrado ainda.</td></tr>`;
    return;
  }

  const recentes = [...fornecedores]
    .sort((a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro))
    .slice(0, QUANTIDADE_RECENTES);

  recentes.forEach((f) => {
    const tr = document.createElement("tr");
    const ativo = f.status === "ATIVO";
    tr.innerHTML = `
      <td></td>
      <td>${formatarCnpj(f.cnpj)}</td>
      <td></td>
      <td><span class="badge ${ativo ? "ativo" : "inativo"}">${ativo ? "Ativo" : "Inativo"}</span></td>
    `;
    tr.children[0].textContent = f.razao_social;
    tr.children[2].textContent = f.email;
    corpoRecentes.appendChild(tr);
  });
}

async function carregar() {
  mostrarMensagem("", "");
  try {
    const fornecedores = await listarFornecedores();
    renderizarResumo(fornecedores);
    renderizarRecentes(fornecedores);
  } catch (erro) {
    mostrarMensagem("Não foi possível carregar os dados. Tente atualizar a página.", "erro");
  }
}

botaoAtualizar.addEventListener("click", carregar);

carregar();