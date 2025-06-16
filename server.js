require("dotenv").config();

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


app.post("/api/v1/conexao", async (req, res) => {
    const{
        id_usuario_a,
        id_usuario_b
    } = req.body;

    const conexao = await prisma.conexao.create({
        data:{
            id_usuario_a,
            id_usuario_b
        }
    });
    console.log(conexao);
    res.status(201).json(conexao);
});

app.get("/api/v1/conexao", async (req, res) => {
    const conexao = await prisma.conexao.findMany();
    res.status(200).json(conexao);
})

app.get("/api/v1/partida/em-andamento", async (req, res) => {
    const partidas = await prisma.conexao.findMany({
        where: {
            status: 'criado'
        }
    });
    res.status(200).json(partidas);
}
);

app.post("/api/v1/partidaHistorico", async (req, res) => {
    const {
        id_partida,
        id_usuario,
        area_jogada,
        peca_do_jogador
    } = req.body;
        const partida_historico = await prisma.partida_historico.create({
            data: {
                id_partida,
                id_usuario,
                area_jogada,
                peca_do_jogador
            }
        });

        res.status(201).json(partida_historico);
    });

app.post("/api/v1/login",async (req, res) => {

    const {email, senha}= req.body;

    const usuario = await prisma.usuario.findUnique({where:{email,senha}})

    if(!usuario){
        return res.status(401).json({error: "Erro ao realizar login"});
    }
    const response = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        username: usuario.username,
        avatar: usuario.avatar
    };
    res.status(200).json({ message: "Login realizado com Sucesso!" });


});


app.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
