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

async function autenticar(usuario, senha) {
  const resposta = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usuario,
      senha: senha,
    }),
  });

  const dados = await resposta.json();

  return {
    ok: resposta.ok,
    dados: dados,
  };
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
      mostrarMensagem("Login validado.", "sucesso");
    } else {
      mostrarMensagem("Usuário ou senha inválidos.", "erro");
    }
  } catch (erro) {
    mostrarMensagem("Não foi possível conectar. Tente novamente.", "erro");
  }
});