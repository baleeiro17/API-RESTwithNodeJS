
// base para criarmos as rotas.
const express = require('express');

// criando um atalho para podermos criar a rota.
const router = express.Router();

// chamando o controller.
const controller = require('../controllers/product-controllers');
const authService = require('../services/auth-service');

// criamos as minhas rotas para exportar.
// essa rota necessita de uma autorização para que podemos prosseguir na mesma.
router.post( '/', authService.isAdmin, controller.post );
router.put( '/:id', authService.isAdmin, controller.put );
router.delete( '/', authService.isAdmin, controller.delete );
router.get( '/', controller.get );
router.get( '/:slug', controller.getBySlug );
// router.get('/:id', controller.getById ); cuidado se usamos dessa maneira teremos um conflito de rotas.
// para solucionar esse problema temos que criar outra rota:
router.get( '/admin/:id', controller.getById );
router.get( '/tags/:tag', controller.getByTag );

// exporta a variavel router para outro arquivo.
module.exports = router;