// base para criarmos as rotas.
const express = require('express');

// criando um atalho para podermos criar a rota.
const router = express.Router();

// chamando o controller.
const controller = require('../controllers/customer-controllers');
const authService = require('../services/auth-service');

router.post( '/', controller.post );
router.post( '/authenticate', controller.authenticate );
router.post( '/refresh-token', authService.authorize, controller.refreshToken );

module.exports = router;