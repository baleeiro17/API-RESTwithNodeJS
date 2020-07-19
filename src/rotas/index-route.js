
// base para criarmos as rotas.
const express = require('express');

// criando um atalho para podermos criar a rota.
const router = express.Router();

// criação da rota padrão.
router.get('/', (req,res,next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.3"
    });
});

// exporta a variavel router para outro arquivo.
module.exports = router;