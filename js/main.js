// NAVEGAÇÃO
document.querySelectorAll("[data-link]").forEach(item => {
  item.addEventListener("click", () => {
    let pagina = item.getAttribute("data-link");
    window.location.href = pagina;
  });
});

// LOGOUT
let logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    alert("Saindo...");
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  });
} 


// TOGGLE TEMA GLOBAL

function configurarTema() {
  const btnClaro = document.getElementById("temaClaro");
  const btnEscuro = document.getElementById("temaEscuro");

  // 🔥 evita erro em outras páginas
  if (!btnClaro || !btnEscuro) return;

  btnClaro.addEventListener("click", () => {
    document.body.classList.remove("dark");
    btnClaro.classList.add("ativo");
    btnEscuro.classList.remove("ativo");
    localStorage.setItem("tema", "claro");
  });

  btnEscuro.addEventListener("click", () => {
    document.body.classList.add("dark");
    btnEscuro.classList.add("ativo");
    btnClaro.classList.remove("ativo");
    localStorage.setItem("tema", "escuro");
  });
}

function carregarTema() {
  const tema = localStorage.getItem("tema");

  const btnClaro = document.getElementById("temaClaro");
  const btnEscuro = document.getElementById("temaEscuro");

  if (tema === "escuro") {
    document.body.classList.add("dark");

    if (btnEscuro) btnEscuro.classList.add("ativo");
    if (btnClaro) btnClaro.classList.remove("ativo");
  } else {
    document.body.classList.remove("dark");

    if (btnClaro) btnClaro.classList.add("ativo");
    if (btnEscuro) btnEscuro.classList.remove("ativo");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  configurarTema();
  carregarTema();
});


/* FAMÍLIA


// abrir modal
function abrirModalFamilia() {
  document.getElementById("modalFamilia").classList.add("active");
}

// fechar modal
function fecharModalFamilia() {
  document.getElementById("modalFamilia").classList.remove("active");
}

// botão abrir
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("abrirModalFamilia");
  if (btn) {
    btn.addEventListener("click", abrirModalFamilia);
  }

  carregarFamilia();
});

// adicionar membro
function adicionarMembro() {
  const emailInput = document.getElementById("emailFamilia");
  const email = emailInput.value;

  if (!email) return alert("Digite um email!");

  let familia = JSON.parse(localStorage.getItem("familia")) || [];

  familia.push(email);

  localStorage.setItem("familia", JSON.stringify(familia));

  emailInput.value = "";

  fecharModalFamilia();
  carregarFamilia();
}

// mostrar membros
function carregarFamilia() {
  const lista = document.getElementById("listaFamilia");
  if (!lista) return;

  lista.innerHTML = "";

  const familia = JSON.parse(localStorage.getItem("familia")) || [];

  familia.forEach(email => {
    const div = document.createElement("div");
    div.classList.add("membro");
    div.textContent = email;

    lista.appendChild(div);
  });
} */
