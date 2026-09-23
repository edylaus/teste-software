const form = document.getElementById("form-fornecedor");
const campoRazaoSocial = document.getElementById("razaoSocial");
const campoNomeFantasia = document.getElementById("nomeFantasia");
const campoCnpj = document.getElementById("cnpj");
const campoTelefone = document.getElementById("telefone");
const campoEmail = document.getElementById("email");
const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoUf = document.getElementById("uf");
const campoCategoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function limparErros() {
  [campoRazaoSocial, campoCnpj, campoTelefone, campoEmail, campoCategoria].forEach((campo) =>
    campo.classList.remove("invalido")
  );
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
// substituir por um POST real em http://localhost:3000/api/fornecedores
// (ver contrato em api/fornecedor-api/README.md).
// Atenção: hoje o middleware validarFornecedor.js exige "endereco" e "segmento",
// campos que não existem na tabela nem no repository — isso vai travar qualquer
// chamada real até o middleware ser corrigido para usar cep/cidade/uf/categoria.
async function cadastrarFornecedor(dados) {
  return { ok: true };
}

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  limparErros();

  const razaoSocial = campoRazaoSocial.value.trim();
  const cnpj = campoCnpj.value.replace(/\D/g, "");
  const telefone = campoTelefone.value.trim();
  const email = campoEmail.value.trim();
  const categoria = campoCategoria.value.trim();

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

  if (!telefone) {
    campoTelefone.classList.add("invalido");
    mostrarMensagem("Informe o telefone.", "erro");
    campoTelefone.focus();
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    campoEmail.classList.add("invalido");
    mostrarMensagem("E-mail inválido.", "erro");
    campoEmail.focus();
    return;
  }

  if (!categoria) {
    campoCategoria.classList.add("invalido");
    mostrarMensagem("Informe a categoria.", "erro");
    campoCategoria.focus();
    return;
  }

  const dados = {
    razaoSocial,
    nomeFantasia: campoNomeFantasia.value.trim() || undefined,
    cnpj,
    telefone,
    email,
    cep: campoCep.value.replace(/\D/g, "") || undefined,
    cidade: campoCidade.value.trim() || undefined,
    uf: campoUf.value || undefined,
    categoria,
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