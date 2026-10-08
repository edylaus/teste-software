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

async function listarFornecedores() {
  const resposta = await fetch("http://localhost:3000/api/fornecedores");

  if (!resposta.ok) {
    throw new Error("Erro ao buscar fornecedores");
  }

  return resposta.json();
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
    .sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro))
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
    tr.children[0].textContent = f.razaoSocial;
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