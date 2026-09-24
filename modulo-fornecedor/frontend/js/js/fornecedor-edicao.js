const form = document.getElementById("form-fornecedor");
const subtitulo = document.getElementById("subtitulo");
const linkVoltar = document.getElementById("linkVoltar");
const linkCancelar = document.getElementById("linkCancelar");
const mensagemCarregamento = document.getElementById("mensagemCarregamento");
const campoRazaoSocial = document.getElementById("razaoSocial");
const campoNomeFantasia = document.getElementById("nomeFantasia");
const campoCnpj = document.getElementById("cnpj");
const campoCategoria = document.getElementById("categoria");
const campoCep = document.getElementById("cep");
const campoRua = document.getElementById("rua");
const campoNumero = document.getElementById("numero");
const campoComplemento = document.getElementById("complemento");
const campoBairro = document.getElementById("bairro");
const campoCidade = document.getElementById("cidade");
const campoUf = document.getElementById("uf");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const mensagem = document.getElementById("mensagem");

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const CAMPOS_VALIDAVEIS = [
  campoRazaoSocial,
  campoCnpj,
  campoCategoria,
  campoCep,
  campoRua,
  campoNumero,
  campoBairro,
  campoEmail,
  campoTelefone,
];

const idFornecedor = Number(new URLSearchParams(window.location.search).get("id"));

// CNPJ que veio do banco. Os dados de teste têm CNPJs com dígito verificador
// inválido, então só validamos o CNPJ se o usuário alterar esse campo.
let cnpjOriginal = "";

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function limparErros() {
  CAMPOS_VALIDAVEIS.forEach((campo) => campo.classList.remove("invalido"));
  mensagem.textContent = "";
  mensagem.className = "mensagem";
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function formatarCep(cep) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

campoCnpj.addEventListener("input", () => {
  let v = campoCnpj.value.replace(/\D/g, "").slice(0, 14);
  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  campoCnpj.value = v;
});

campoCep.addEventListener("input", () => {
  let v = campoCep.value.replace(/\D/g, "").slice(0, 8);
  v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  campoCep.value = v;
});

function cnpjEhValido(cnpj) {
  if (!/^[0-9]{14}$/.test(cnpj)) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const calcularDigito = (base) => {
    const pesos =
      base.length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma = base
      .split("")
      .reduce((acc, digito, index) => acc + Number(digito) * pesos[index], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base12 = cnpj.substring(0, 12);
  const digito1 = calcularDigito(base12);
  const digito2 = calcularDigito(base12 + digito1);

  return cnpj === base12 + String(digito1) + String(digito2);
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

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir por um PUT real em http://localhost:3000/api/fornecedores/:id.
async function atualizarFornecedor(id, dados) {
  return { ok: true };
}

function preencherFormulario(f) {
  subtitulo.textContent = `Altere os dados de ${f.nome_fantasia || f.razao_social}.`;
  campoRazaoSocial.value = f.razao_social || "";
  campoNomeFantasia.value = f.nome_fantasia || "";
  cnpjOriginal = f.cnpj || "";
  campoCnpj.value = f.cnpj ? formatarCnpj(f.cnpj) : "";
  campoCategoria.value = f.categoria || "";
  campoCep.value = f.cep ? formatarCep(f.cep) : "";
  campoRua.value = f.rua || "";
  campoNumero.value = f.numero || "";
  campoComplemento.value = f.complemento || "";
  campoBairro.value = f.bairro || "";
  campoCidade.value = f.cidade || "";
  campoUf.value = f.uf || "";
  campoEmail.value = f.email || "";
  campoTelefone.value = f.telefone || "";
  form.hidden = false;
}

async function carregar() {
  if (!idFornecedor) {
    subtitulo.textContent = "Nenhum fornecedor selecionado.";
    mensagemCarregamento.textContent = "Abra esta tela a partir da listagem de fornecedores.";
    return;
  }

  const paginaDetalhes = `fornecedor-detalhes.html?id=${idFornecedor}`;
  linkVoltar.href = paginaDetalhes;
  linkCancelar.href = paginaDetalhes;

  try {
    const fornecedor = await buscarFornecedorPorId(idFornecedor);
    if (!fornecedor) {
      subtitulo.textContent = "Fornecedor não encontrado.";
      mensagemCarregamento.textContent = "Esse fornecedor não existe ou foi excluído.";
      return;
    }
    preencherFormulario(fornecedor);
  } catch (erro) {
    subtitulo.textContent = "Não foi possível carregar o fornecedor.";
    mensagemCarregamento.textContent = "Erro ao buscar os dados. Tente atualizar a página.";
  }
}

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  limparErros();

  const razaoSocial = campoRazaoSocial.value.trim();
  const cnpj = campoCnpj.value.replace(/\D/g, "");
  const categoria = campoCategoria.value.trim();
  const cep = campoCep.value.replace(/\D/g, "");
  const rua = campoRua.value.trim();
  const numero = campoNumero.value.trim();
  const bairro = campoBairro.value.trim();
  const email = campoEmail.value.trim();
  const telefone = campoTelefone.value.trim();

  const erros = [
    [razaoSocial.length < 3, campoRazaoSocial, "Razão social deve possuir ao menos 3 caracteres."],
    [cnpj !== cnpjOriginal && !cnpjEhValido(cnpj), campoCnpj, "CNPJ inválido."],
    [!categoria, campoCategoria, "Informe a categoria."],
    [cep.length !== 8, campoCep, "Informe um CEP válido."],
    [!rua, campoRua, "Informe a rua."],
    [!numero, campoNumero, "Informe o número."],
    [!bairro, campoBairro, "Informe o bairro."],
    [!EMAIL_REGEX.test(email), campoEmail, "E-mail inválido."],
    [!telefone, campoTelefone, "Informe o telefone."],
  ];

  const primeiroErro = erros.find(([temErro]) => temErro);
  if (primeiroErro) {
    const [, campo, texto] = primeiroErro;
    campo.classList.add("invalido");
    mostrarMensagem(texto, "erro");
    campo.focus();
    return;
  }

  const dados = {
    razaoSocial,
    nomeFantasia: campoNomeFantasia.value.trim() || undefined,
    cnpj,
    categoria,
    cep,
    rua,
    numero,
    complemento: campoComplemento.value.trim() || undefined,
    bairro,
    cidade: campoCidade.value.trim() || undefined,
    uf: campoUf.value || undefined,
    email,
    telefone,
  };

  try {
    const resposta = await atualizarFornecedor(idFornecedor, dados);
    if (resposta.ok) {
      mostrarMensagem("Alterações salvas com sucesso. Voltando para os detalhes...", "sucesso");
      setTimeout(() => {
        window.location.href = `fornecedor-detalhes.html?id=${idFornecedor}`;
      }, 1200);
    } else {
      mostrarMensagem("Não foi possível salvar as alterações.", "erro");
    }
  } catch (erro) {
    mostrarMensagem("Não foi possível conectar. Tente novamente.", "erro");
  }
});

carregar();