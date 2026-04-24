console.log("TRANSACOES.JS OK");

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


/* MODALLLLL */
function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
  let modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function salvarTransacao() {
  let tipo = document.getElementById("tipo").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;
  let data = document.getElementById("data").value;

  if (!descricao || !valor || !data || tipo === "Tipo" || categoria === "Categoria") {
    alert("Preencha todos os campos!");
    return;
  }

  let tabela = document.getElementById("tabela-body");
  let linha = document.createElement("tr");
  
  let aviso = document.getElementById("sem-dados");
  if (aviso) aviso.style.display = "none";

  let dataFormatada = new Date(data).toLocaleDateString("pt-BR");

  let valorFormatado = parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  linha.innerHTML = `
    <td class="${tipo === 'Receita' ? 'receita' : 'despesa'}">${tipo}</td>
    <td>${categoria}</td>
    <td>${descricao}</td>
    <td>${dataFormatada}</td>
    <td class="${tipo === 'Receita' ? 'positivo' : 'negativo'}">
      ${tipo === 'Despesa' ? '- ' : ''}${valorFormatado}
    </td>
  `;

  tabela.appendChild(linha);
  

  fechrModal();
  limparFormulario();
  verificarTabela();
}


function limparFormulario() {
  document.getElementById("tipo").value = "Tipo";
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("data").value = "";
}

function filtrarTabela() {
  let busca = document.getElementById("filtro-busca").value.toLowerCase();
  let categoria = document.getElementById("filtro-categoria").value;
  let tipo = document.getElementById("filtro-tipo").value;

  let linhas = document.querySelectorAll("#tabela-body tr");

  linhas.forEach(linha => {
    let colTipo = linha.children[0].textContent;
    let colCategoria = linha.children[1].textContent;
    let colDescricao = linha.children[2].textContent.toLowerCase();

    let matchBusca = colDescricao.includes(busca);
    let matchCategoria = categoria === "" || colCategoria === categoria;
    let matchTipo = tipo === "" || colTipo === tipo;

    if (matchBusca && matchCategoria && matchTipo) {
      linha.style.display = "";
    } else {
      linha.style.display = "none";
    }
  });
}

// LIMPAR FILTROS
function limparFiltros() {
  document.getElementById("filtro-busca").value = "";
  document.getElementById("filtro-categoria").value = "";
  document.getElementById("filtro-tipo").value = "";

  filtrarTabela(); // reaplica filtro (mostra tudo)
}

// verificar tabela 

function verificarTabela() {
  let tabela = document.getElementById("tabela-body");
  let aviso = document.getElementById("sem-dados");

  if (tabela.children.length > 1) {
    aviso.style.display = "none";
  } else {
    aviso.style.display = "";
  }
}

document.addEventListener("DOMContentLoaded", verificarTabela);
