console.log("HOME.JS OK");

document.addEventListener("DOMContentLoaded", async () => {
  carregarUsuario();
  await carregarDadosFinanceiros();
});

function carregarUsuario() {
  const nome = localStorage.getItem("nomeUsuario");

  console.log("NOME:", nome);

  if (!nome) return;

  document.getElementById("nome-usuario").textContent = nome;
  document.getElementById("saudacao").textContent = `Olá, ${nome}!`;
  document.getElementById("avatar").textContent = nome.charAt(0).toUpperCase();
}

async function carregarDadosFinanceiros() {
  const token = localStorage.getItem("accessToken");

  console.log("TOKEN:", token);

  if (!token) {
    console.log("SEM TOKEN → REDIRECIONANDO");
    window.location.href = "index.html";
    return;
  }

  try {
    const despesasRes = await fetch("https://www.manage-control-dev.com.br/api/v1/expense/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("STATUS DESPESAS:", despesasRes.status);

    if (despesasRes.status === 401) {
      console.log("TOKEN INVÁLIDO → DESLOGANDO");
      localStorage.clear();
      window.location.href = "index.html";
      return;
    }

    const despesasJson = await despesasRes.json();
    const despesas = despesasJson.data || despesasJson;

    const receitasRes = await fetch("https://www.manage-control-dev.com.br/api/v1/income/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("STATUS RECEITAS:", receitasRes.status);

    const receitasJson = await receitasRes.json();
    const receitas = receitasJson.data || receitasJson;

    calcularResumo(receitas, despesas);

  } catch (error) {
    console.log("ERRO REAL:", error);
  }
}

function calcularResumo(receitas, despesas) {
  const totalReceitas = receitas.reduce((acc, r) =>
    acc + (r.amount || r.value || 0), 0
  );

  const totalDespesas = despesas.reduce((acc, d) =>
    acc + (d.amount || d.value || 0), 0
  );

  const saldo = totalReceitas - totalDespesas;

  document.getElementById("total-receitas").textContent = formatar(totalReceitas);
  document.getElementById("total-despesas").textContent = formatar(totalDespesas);
  document.getElementById("valor").textContent = formatar(saldo);

  atualizarSaldoVisual(saldo);
  atualizarOrcamento(totalDespesas, totalReceitas);
}

function formatar(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function atualizarSaldoVisual(saldo) {
  const valorEl = document.getElementById("valor");
  const mensagem = document.getElementById("mensagem-saldo");
  const seta = document.getElementById("seta");

  if (saldo >= 0) {
    valorEl.classList.add("positivo");
    valorEl.classList.remove("negativo");

    mensagem.textContent = "Seu saldo está positivo 👍";
    mensagem.className = "mensagem positivo";

    seta.textContent = "↑";
  } else {
    valorEl.classList.add("negativo");
    valorEl.classList.remove("positivo");

    mensagem.textContent = "Atenção! Você está no negativo";
    mensagem.className = "mensagem negativo";

    seta.textContent = "↓";
  }
}

function atualizarOrcamento(despesas, receitas) {
  const limite = receitas * 0.8; 

  const porcentagem = limite > 0
    ? Math.min(Math.round((despesas / limite) * 100), 100)
    : 0;

  document.getElementById("orcamento").value = porcentagem;
  document.getElementById("texto-orcamento").textContent =
    `${porcentagem}% do limite`;
}

/*/async function carregarMetas() {
  const token = localStorage.getItem("accessToken");

  try{
    const response = await fetch("https://www.manage-control-dev.com.br/api/v1/goals", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!response.ok) {
      console.log("API de metas não encontrada (404)");
      return;
    }

    const metasJson = await response.json();
    const metas = metasJson.data || metasJson;

    renderizarMetas(metas);

  } catch (error){
    console.log("Erro metas:", error);
  }
}

function renderizarMetas(metas){
  const container = document.getElementById("container-metas");

  container.innerHTML = "<h3>Metas de Economia</h3>";

  if (!metas || metas.length === 0){
    container.innerHTML += "<p>Nenhuma meta cadastrada</p>";
    return;
  }

  metas.forEach(meta => {
    const progresso = meta.progress || 0;
    const nome = meta.name || "Meta";

    container.innerHTML += `
      <div class="meta-item"> 
        <div class="meta-info"> 
          <span>${nome}</span> 
          <span>${progresso}%</span> 
        </div> 
        <div class="meta-bar"> 
          <div class="meta-progress" style="width:${progresso}%"></div> 
        </div> 
      </div>
    `;
  });
}/*/
