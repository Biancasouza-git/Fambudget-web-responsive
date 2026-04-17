const axios = require("axios");

const API_URL = "http://localhost:8000";

async function login(req, res){

        try {
            const{email, password} = req.body;

            const response = await axios.post(`${API_URL}/auth/login`, {
                email: email,
                password: password,    
            });

            return res.status(200).json({
                message: response.data.message || "Login realizado",
                data: response.data,
            });

        } catch (error) {
            if (error.response) {
                return res.status(error.response.status).json({
                    message: error.response.data.detail || "Erro na API",
            });
        }

        return res.status(500).json({
            message: "Erro ao conectar com a API",
        });
    }
}

async function register(req, res){
    try{
        const { email, password } = req.body;

        const response = await axios.post(`${API_URL}/auth/register`, {
            email: email,
            password: password
        });

        return res.json({
            message: "Cadastro realizado com sucesso"
        });
    } catch (error){
        return res.status(400).json({
            message: "Erro ao cadastrar usuário"
        });
    }
}

module.exports = { login, register };