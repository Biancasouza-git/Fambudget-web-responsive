console.log("ORCAMENTOS.JS OK");

document.addEventListener("DOMContentLoaded", async () => {
  carregarUsuario();
  await carregarDadosFinanceiros();
});

function carregarUsuario() {
  const nome = localStorage.getItem("nomeUsuario");

  console.log("NOME:", nome);

  if (!nome) return;

  document.getElementById("nome-usuario").textContent = nome;
  document.getElementById("avatar").textContent = nome.charAt(0).toUpperCase();
}



function criarOrcamento(nome, total, gasto) {
  let lista = document.getElementById("lista-orcamentos");

  let porcentagem = (gasto / total) * 100;

  let cor = "#2e7d32";
  if (porcentagem > 80) cor = "#f9a825";
  if (porcentagem > 95) cor = "#d32f2f";

  let card = document.createElement("div");
  card.classList.add("card-orcamento");

  card.innerHTML = `
    <div class="topo-orcamento">
      <div class="info">
        <div class="icone">💰</div>
        <strong>${nome}</strong>
      </div>

      <span>R$ ${total.toFixed(2)}</span>
    </div>

    <div class="barra">
      <div class="progresso" style="width:${porcentagem}%"></div>
    </div>

    <div class="topo-orcamento">
      <span>R$ ${(total - gasto).toFixed(2)}</span>
      <span>${porcentagem.toFixed(0)}% do limite</span>
    </div>
  `;

  lista.appendChild(card);
}

/* CRIAR FORMULARIO ORÇAMENTO */
