// arquivo com a aplicação que iremos trabalhar.

// pacotes necessários para aplicação.
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// mongoose usado para criar validações ou esquemas no noSQL como no SQL.
const mongoose = require('mongoose');

// cria a aplicação express.
const app = express();
const router = express.Router();

// conecta ao banco.
mongoose.connect(config.connectionString);

// carrega os models ou seja executa os models que cria um esquema para uso do banco de dados.
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Usando o bodyparser para transformar as requisições,
// precisamos que os dados venham no formato de um json.
// Porém, o Node.js em si não sabe converter os dados da requisição para o formato que queremos. 
// Então… Como vamos recuperar os dados?
// O body-parser é um módulo capaz de converter o body da requisição para vários formatos
// limite define restrições para o tamanho do json, usamos 5mb por causa da presença de imagens.
app.use( bodyParser.json( {
    limit: '5mb'
} ) );
app.use( bodyParser.urlencoded( {extended: false } ) );

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // libera acesso para minha api por qualquer URL.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // libera todos os métodos.
    next();
});

// chamando as minhas rotas a partir dos arquivos de aplicação.
const index = require('./rotas/index-route'); 
const productRoute = require('./rotas/product-route');
const customerRoute = require('./rotas/customer-route');
const orderRoute = require('./rotas/order-route');

// colocando as rotas na aplicação.
app.use('/',index);
app.use('/products',productRoute);
app.use('/customers',customerRoute);
app.use('/orders',orderRoute);


module.exports = app;