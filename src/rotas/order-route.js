// base para criarmos as rotas.
const express = require('express');

// criando um atalho para podermos criar a rota.
const router = express.Router();

// chamando o controller.
const controller = require('../controllers/order-controllers');
const authService = require('../services/auth-service');

router.post( '/', authService.authorize, controller.post );
router.get( '/', controller.get );

module.exports = router;