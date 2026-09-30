const formConfig = document.getElementById("formConfig");
const campoNome = document.getElementById("nome");
const campoCargo = document.getElementById("cargo");
const campoEmail = document.getElementById("email");
const campoNotifEmail = document.getElementById("notifEmail");
const campoNotifSistema = document.getElementById("notifSistema");
const campoAlertaPendentes = document.getElementById("alertaPendentes");
const campoIdioma = document.getElementById("idioma");
const campoItensPorPagina = document.getElementById("itensPorPagina");
const mensagem = document.getElementById("mensagem");

const CHAVE_ARMAZENAMENTO = "moduloFornecedor.configuracoes";

const PADRAO = {
  nome: "Usuário",
  cargo: "Gestor de Compras",
  email: "usuario@empresa.com",
  notifEmail: true,
  notifSistema: true,
  alertaPendentes: false,
  idioma: "pt-BR",
  itensPorPagina: "10",
};

// Por enquanto as configurações ficam salvas só neste navegador (localStorage).
// Não existe rota de configurações na API ainda.
function carregarConfiguracoes() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO));
    return { ...PADRAO, ...(salvo || {}) };
  } catch (erro) {
    return { ...PADRAO };
  }
}

function salvarConfiguracoes(config) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(config));
    return true;
  } catch (erro) {
    return false;
  }
}

function preencherFormulario(config) {
  campoNome.value = config.nome;
  campoCargo.value = config.cargo;
  campoEmail.value = config.email;
  campoNotifEmail.checked = config.notifEmail;
  campoNotifSistema.checked = config.notifSistema;
  campoAlertaPendentes.checked = config.alertaPendentes;
  campoIdioma.value = config.idioma;
  campoItensPorPagina.value = config.itensPorPagina;
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + (tipo || "");
}

formConfig.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const config = {
    nome: campoNome.value.trim(),
    cargo: campoCargo.value.trim(),
    email: campoEmail.value.trim(),
    notifEmail: campoNotifEmail.checked,
    notifSistema: campoNotifSistema.checked,
    alertaPendentes: campoAlertaPendentes.checked,
    idioma: campoIdioma.value,
    itensPorPagina: campoItensPorPagina.value,
  };

  if (salvarConfiguracoes(config)) {
    mostrarMensagem("Configurações salvas.", "sucesso");
  } else {
    mostrarMensagem("Não foi possível salvar as configurações.", "erro");
  }
});

preencherFormulario(carregarConfiguracoes());