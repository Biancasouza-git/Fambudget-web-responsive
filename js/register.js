console.log("REGISTER JS CARREGOU");

function abrirPopup(mensagem) {
  document.getElementById("popup-text").innerText = mensagem;
  document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
}

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    abrirPopup("As senhas não coincidem");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      abrirPopup(data.message || "Erro ao cadastrar");
      return;
    }

    abrirPopup("Cadastro realizado com sucesso!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch (error) {
    abrirPopup("Erro ao conectar com o servidor");
  }
});
