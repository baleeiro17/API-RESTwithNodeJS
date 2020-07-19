const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.post = async (req,res,next) => {

    try {

        // recebendo os valores do customer via token nesse caso.
        // esse token é certo pois essa rota depende de autorização para que podemos acessá-la.
        const token =  req.body.token || req.query.token || req.headers['x-access-token'];

        // decodifica o token para sabermos algumas informações do customer.
        const data = await authService.decodeToken( token );
        
        await repository.create( {
            // cuidado o json aqui gerado é com id não é o mesmo usado pelo customer.
            customer: data.id,
            // pega o guid gerado a partir de uma string de 6 caracteres.
            number: guid.raw().substring(0, 6),
            items: req.body.items
        } );
        res.status( 201 ).send( {
            message: "O pedido foi cadastrado com sucesso",
        });

    } catch( e ) {
        res.status( 500 ).send( {
            message: "Falha ao processar a requsição",
            data: e
        });
    }
};

exports.get = async (req,res,next) => {
    try {
        const data = await repository.get();
        res.status(200).send( data );

    }catch( e ) {
        res.status(400).send( {
            message: "Falha ao realizar a requisição",
            data: e
        });

    }
};