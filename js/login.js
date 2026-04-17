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

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        const mensagem = document.getElementById("mensagem");

        mensagem.innerText = data.message;
        mensagem.className = "alerta sucesso";
        mensagem.style.display = "block";

        setTimeout(() => {
            mensagem.style.display = "none";
        }, 3000);

    } catch (error) {
        const mensagem = document.getElementById("mensagem");

        mensagem.innerText = "Erro ao conectar com o servidor";
        mensagem.className = "alerta erro";
        mensagem.style.display = "block";

        setTimeout(() => {
            mensagem.style.display = "none";
        }, 3000);
    }
});