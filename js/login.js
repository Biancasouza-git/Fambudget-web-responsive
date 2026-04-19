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

    const data = await response.json();

    console.log("RESPOSTA LOGIN:", data); 

    if (!response.ok || !data.token.accessToken) {
      abrirPopup(data.message || "Email ou senha inválidos");
      return;
    }

    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);

    window.location.href = "home.html";

  } catch (error) {
    abrirPopup("Usuário não existe");
  }
});
