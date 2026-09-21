const form = document.getElementById("form-login");
const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function limparErros() {
  campoUsuario.classList.remove("invalido");
  campoSenha.classList.remove("invalido");
  mensagem.textContent = "";
  mensagem.className = "mensagem";
}

// PONTO DE INTEGRAÇÃO (Dev 2):
// substituir esta função pela chamada real à API de login.
async function autenticar(usuario, senha) {
  return { ok: true };
}

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  limparErros();

  const usuario = campoUsuario.value.trim();
  const senha = campoSenha.value;

  if (!usuario) {
    campoUsuario.classList.add("invalido");
    mostrarMensagem("Informe o usuário.", "erro");
    campoUsuario.focus();
    return;
  }

  if (!senha) {
    campoSenha.classList.add("invalido");
    mostrarMensagem("Informe a senha.", "erro");
    campoSenha.focus();
    return;
  }

  try {
    const resposta = await autenticar(usuario, senha);

    if (resposta.ok) {
      mostrarMensagem("Login validado. Redirecionando...", "sucesso");
      // Navegação entre telas: por enquanto o "destino" pós-login é o
      // cadastro de fornecedor, já que ainda é a única tela do módulo.
      setTimeout(() => {
        window.location.href = "fornecedor-cadastro.html";
      }, 700);
    } else {
      mostrarMensagem("Usuário ou senha inválidos.", "erro");
    }
  } catch (erro) {
    mostrarMensagem("Não foi possível conectar. Tente novamente.", "erro");
  }
});