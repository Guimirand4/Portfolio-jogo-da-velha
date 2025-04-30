const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

const PORT = 8080;
app.use(express.json());
app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.json({ message: "API funcionando corretamente!" });
});

app.post("/api/v1/usuarios", async (req, res) => {
    const { nome, email, senha, username, avatar } = req.body;

    try {
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
                username,
                avatar
            }
        });
        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
}
);

app.post("/api/v1/login",async (req, res) => {
    res.status(200).json({ message: "Login realizado com Sucesso!" });

    const {email, senha}= req.body;
    const usuario = await prisma.usuario.findUnique({where:{email,senha}})
    if(!usuario){
        return res.status(401).json({error: "Erro ao realizar login"});
    }
    else{
        return res.status(200).json(usuario);
    }


});
app.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
