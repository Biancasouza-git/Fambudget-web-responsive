function abrirPopup(mensagem) {
  document.getElementById("popup-text").innerText = mensagem;
  document.getElementById("popup").classList.remove("hidden");
}

function fecharPopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://www.manage-control-dev.com.br/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          mobileNumber,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(JSON.stringify(data));
        return;
      }

      abrirPopup("Cadastro realizado com sucesso!");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);

    } catch (error) {
      abrirPopup("Usuário já cadastrado!");
    }
  });
});
