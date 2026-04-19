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
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log("RESPOSTA LOGIN:", data); 

    if (!response.ok || !data.access_token) {
      abrirPopup(data.message || "Email ou senha inválidos");
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    window.location.href = "home.html";

  } catch (error) {
    abrirPopup("Usuário não existe");
  }
});
