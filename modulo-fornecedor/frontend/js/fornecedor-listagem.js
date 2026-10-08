const corpoTabela = document.getElementById("corpoTabela");
const mensagem = document.getElementById("mensagem");
const totalTexto = document.getElementById("totalTexto");

const campoBusca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtroStatus");
const filtroCidade = document.getElementById("filtroCidade");
const filtroEstado = document.getElementById("filtroEstado");

const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoAtualizar = document.getElementById("botaoAtualizar");

let fornecedores = [];

// Exibe mensagens de sucesso ou erro na tela
function mostrarMensagem(texto, tipo = "") {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

// Formata o CNPJ para XX.XXX.XXX/XXXX-XX
function formatarCnpj(cnpj) {
  if (!cnpj) return "—";

  const somenteNumeros = String(cnpj).replace(/\D/g, "");

  if (somenteNumeros.length !== 14) {
    return cnpj;
  }

  return somenteNumeros.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

// Aceita tanto o padrão camelCase retornado pela API
// quanto nomes antigos usados anteriormente no frontend.
function obterValor(fornecedor, camelCase, snakeCase) {
  return fornecedor[camelCase] ?? fornecedor[snakeCase] ?? "";
}

function obterId(fornecedor) {
  return fornecedor.id ?? fornecedor.id_fornecedor;
}

function obterRazaoSocial(fornecedor) {
  return obterValor(fornecedor, "razaoSocial", "razao_social");
}

function obterNomeFantasia(fornecedor) {
  return obterValor(fornecedor, "nomeFantasia", "nome_fantasia");
}

function obterNomeExibicao(fornecedor) {
  return obterNomeFantasia(fornecedor) || obterRazaoSocial(fornecedor) || "—";
}

// Cria as linhas da tabela com os fornecedores recebidos da API
function renderizarTabela(lista) {
  corpoTabela.innerHTML = "";

  if (lista.length === 0) {
    corpoTabela.innerHTML = `
      <tr>
        <td colspan="6">Nenhum fornecedor encontrado.</td>
      </tr>
    `;

    totalTexto.textContent = `Mostrando 0 de ${fornecedores.length} fornecedores`;
    return;
  }

  lista.forEach((fornecedor) => {
    const id = obterId(fornecedor);
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${obterNomeExibicao(fornecedor)}</td>
      <td>${formatarCnpj(fornecedor.cnpj)}</td>
      <td>${fornecedor.telefone || "—"}</td>
      <td>${fornecedor.email || "—"}</td>
      <td>${fornecedor.status || "—"}</td>
      <td>
        <a href="fornecedor-detalhes.html?id=${id}">
          Ver detalhes
        </a>
      </td>
    `;

    corpoTabela.appendChild(linha);
  });

  totalTexto.textContent =
    `Mostrando ${lista.length} de ${fornecedores.length} fornecedores`;
}

// Preenche automaticamente os filtros de cidade e estado
function preencherFiltros() {
  const cidades = [
    ...new Set(
      fornecedores
        .map((fornecedor) => fornecedor.cidade)
        .filter(Boolean)
    ),
  ].sort();

  const estados = [
    ...new Set(
      fornecedores
        .map((fornecedor) => fornecedor.uf)
        .filter(Boolean)
    ),
  ].sort();

  filtroCidade.innerHTML = '<option value="">Todas</option>';
  filtroEstado.innerHTML = '<option value="">Todos</option>';

  cidades.forEach((cidade) => {
    const option = document.createElement("option");
    option.value = cidade;
    option.textContent = cidade;
    filtroCidade.appendChild(option);
  });

  estados.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado;
    filtroEstado.appendChild(option);
  });
}

// Aplica busca e filtros aos dados recebidos da API
function aplicarFiltros() {
  const busca = campoBusca.value.trim().toLowerCase();
  const status = filtroStatus.value;
  const cidade = filtroCidade.value;
  const estado = filtroEstado.value;

  const resultado = fornecedores.filter((fornecedor) => {
    const razaoSocial = obterRazaoSocial(fornecedor).toLowerCase();
    const nomeFantasia = obterNomeFantasia(fornecedor).toLowerCase();
    const cnpj = String(fornecedor.cnpj || "").replace(/\D/g, "");
    const buscaNumerica = busca.replace(/\D/g, "");

    const correspondeBusca =
      !busca ||
    razaoSocial.includes(busca) ||
    nomeFantasia.includes(busca) ||
    (buscaNumerica.length > 0 && cnpj.includes(buscaNumerica));

    const correspondeStatus =
      !status || fornecedor.status === status;

    const correspondeCidade =
      !cidade || fornecedor.cidade === cidade;

    const correspondeEstado =
      !estado || fornecedor.uf === estado;

    return (
      correspondeBusca &&
      correspondeStatus &&
      correspondeCidade &&
      correspondeEstado
    );
  });

  renderizarTabela(resultado);
}

// Busca os fornecedores reais através de api.js
async function carregarFornecedores() {
  mostrarMensagem("", "");

  try {
    fornecedores = await buscarFornecedores();

    if (!Array.isArray(fornecedores)) {
      fornecedores = [];
    }

    preencherFiltros();
    aplicarFiltros();
  } catch (erro) {
    console.error(erro);

    fornecedores = [];
    corpoTabela.innerHTML = "";
    totalTexto.textContent = "Mostrando 0 de 0 fornecedores";

    mostrarMensagem(
      "Não foi possível carregar os fornecedores. Verifique se a API está funcionando.",
      "erro"
    );
  }
}

botaoFiltrar.addEventListener("click", aplicarFiltros);

botaoAtualizar.addEventListener("click", carregarFornecedores);

campoBusca.addEventListener("input", aplicarFiltros);

carregarFornecedores();