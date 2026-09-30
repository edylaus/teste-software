const form = document.getElementById("form-fornecedor");
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

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function limparErros() {
  CAMPOS_VALIDAVEIS.forEach((campo) => campo.classList.remove("invalido"));
  mensagem.textContent = "";
  mensagem.className = "mensagem";
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
// substituir por um POST real em http://localhost:3000/api/fornecedores.
// Atenção: os nomes de campo de endereço abaixo (rua, numero, complemento,
// bairro) são os que aparecem no protótipo de UX/UI, mas ainda precisam
// ser confirmados com o Dev 3 — as colunas que ele criou no banco podem
// ter nomes diferentes (ex: "logradouro" em vez de "rua"). Ajustar aqui
// assim que o nome real das colunas for confirmado.
async function cadastrarFornecedor(dados) {
  return { ok: true };
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

  if (razaoSocial.length < 3) {
    campoRazaoSocial.classList.add("invalido");
    mostrarMensagem("Razão social deve possuir ao menos 3 caracteres.", "erro");
    campoRazaoSocial.focus();
    return;
  }

  if (!cnpjEhValido(cnpj)) {
    campoCnpj.classList.add("invalido");
    mostrarMensagem("CNPJ inválido.", "erro");
    campoCnpj.focus();
    return;
  }

  if (!categoria) {
    campoCategoria.classList.add("invalido");
    mostrarMensagem("Informe a categoria.", "erro");
    campoCategoria.focus();
    return;
  }

  if (cep.length !== 8) {
    campoCep.classList.add("invalido");
    mostrarMensagem("Informe um CEP válido.", "erro");
    campoCep.focus();
    return;
  }

  if (!rua) {
    campoRua.classList.add("invalido");
    mostrarMensagem("Informe a rua.", "erro");
    campoRua.focus();
    return;
  }

  if (!numero) {
    campoNumero.classList.add("invalido");
    mostrarMensagem("Informe o número.", "erro");
    campoNumero.focus();
    return;
  }

  if (!bairro) {
    campoBairro.classList.add("invalido");
    mostrarMensagem("Informe o bairro.", "erro");
    campoBairro.focus();
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    campoEmail.classList.add("invalido");
    mostrarMensagem("E-mail inválido.", "erro");
    campoEmail.focus();
    return;
  }

  if (!telefone) {
    campoTelefone.classList.add("invalido");
    mostrarMensagem("Informe o telefone.", "erro");
    campoTelefone.focus();
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
    const resposta = await cadastrarFornecedor(dados);
    if (resposta.ok) {
      mostrarMensagem("Fornecedor cadastrado com sucesso.", "sucesso");
      form.reset();
    } else {
      mostrarMensagem("Não foi possível cadastrar o fornecedor.", "erro");
    }
  } catch (erro) {
    mostrarMensagem("Não foi possível conectar. Tente novamente.", "erro");
  }
});