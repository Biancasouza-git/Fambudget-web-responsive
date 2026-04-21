function abrirPopup(mensagem) {
  document.getElementById("popup-text").innerText = mensagem;
  document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
}

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://www.manage-control-dev.com.br/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {
      let mensagemErro = "Email ou senha inválidos";

      const msg = (data.message || data.detail || "").toLowerCase();

      if (response.status === 401) {
        mensagemErro = "Senha incorreta";
      } else if (msg.includes("senha") || msg.includes("password")) {
        mensagemErro = "Senha incorreta";
      } else if (msg.includes("email") || msg.includes("user")) {
        mensagemErro = "Usuário não existe";
      }

      abrirPopup(mensagemErro);
      return;
    }

    const token =
      data?.accessToken ||
      data?.token ||
      data?.token?.accessToken ||
      data?.data?.accessToken ||
      data?.data?.token ||
      null;

    console.log("TOKEN EXTRAÍDO:", token);

    if (!token) {
      abrirPopup("Erro: login não retornou token");
      return;
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", data?.refreshToken || "");

    let nomeUsuario = "Usuário";

    if (data.user?.name || data.user?.nome) {
      nomeUsuario = data.user.name || data.user.nome;
    } else if (data.name || data.nome) {
      nomeUsuario = data.name || data.nome;
    } else if (email) {
      nomeUsuario = email.split("@")[0];
    }

    localStorage.setItem("nomeUsuario", nomeUsuario);

    window.location.href = "home.html";

  } catch (error) {
    console.error("ERRO REAL:", error);
    abrirPopup("Erro ao conectar com o servidor");
  }
});
