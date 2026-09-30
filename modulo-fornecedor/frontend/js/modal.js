// Modal de confirmação reutilizável (inativar, ativar, excluir).
// Uso: const confirmou = await confirmarAcao({ titulo, texto, textoBotao });
function confirmarAcao({ titulo, texto, textoBotao }) {
  return new Promise((resolver) => {
    const fundo = document.createElement("div");
    fundo.className = "modal-fundo";
    fundo.innerHTML = `
      <div class="modal-caixa" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
        <div class="modal-icone">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 class="modal-titulo" id="modalTitulo"></h2>
        <p class="modal-texto"></p>
        <div class="modal-botoes">
          <button type="button" class="modal-cancelar">Cancelar</button>
          <button type="button" class="modal-confirmar"></button>
        </div>
      </div>
    `;

    fundo.querySelector(".modal-titulo").textContent = titulo;
    fundo.querySelector(".modal-texto").textContent = texto;
    fundo.querySelector(".modal-confirmar").textContent = textoBotao;

    function fechar(resultado) {
      document.removeEventListener("keydown", aoApertarTecla);
      fundo.remove();
      resolver(resultado);
    }

    function aoApertarTecla(evento) {
      if (evento.key === "Escape") fechar(false);
    }

    fundo.querySelector(".modal-cancelar").addEventListener("click", () => fechar(false));
    fundo.querySelector(".modal-confirmar").addEventListener("click", () => fechar(true));
    fundo.addEventListener("click", (evento) => {
      if (evento.target === fundo) fechar(false);
    });
    document.addEventListener("keydown", aoApertarTecla);

    document.body.appendChild(fundo);
    fundo.querySelector(".modal-cancelar").focus();
  });
}