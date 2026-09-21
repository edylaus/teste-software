const API_URL = "http://localhost:3000/api";

// Busca todos os fornecedores cadastrados na API
async function buscarFornecedores() {
  try {
    const resposta = await fetch(`${API_URL}/fornecedores`);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar fornecedores");
    }

    const fornecedores = await resposta.json();

    console.log("Fornecedores recebidos da API:", fornecedores);

    return fornecedores;
  } catch (erro) {
    console.error("Erro na comunicação com a API:", erro);
    throw erro;
  }
}