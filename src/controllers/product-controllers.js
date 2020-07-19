// gerenciando e modificando as requisições e respostas das minhas rotas.

// chamando uma classe de validators.
const ValidationContract = require("../validator/fluent-validator");

// chamando repositório de códigos.
const repository = require('../repositories/product-repository');

// chamando os funções de autenticação de token.
const authService = require('../services/auth-service');

// rota get da minha api dado a rota products criada no outro arquivo.
exports.get = async (req,res,next) => {
    // coletando os dados ativos  e somente alguns campos.
    // 1 campo filtro do bd e segundo filtro do json

    /*
    código sem async e await
    repository.get().then(
        data => {
            res.status(200).send( data );
        }
    ).catch( 
        e => {
            res.status(400).send( e );
        }
    );
    */
    // código com await e async.
    try {
        var data = await repository.get();
        res.status( 200 ).send( data );
    } catch( e ) {
        res.status( 500 ).send( {
            message: 'Falha ao processar a requisição',
            data: e
        } );
    }
};

// rota get da minha api dado a rota products criada no outro arquivo e o uso de um parametro.
exports.getBySlug = async (req,res,next) => {
    // coletando os dados ativos  e somente alguns campos.
    // 1 campo filtro do bd e segundo filtro do json.
    // uso do slug como filtro no find.
    // como sabemos que o slug é único, podemos evitar de trazer um array usando findOne.
    /*
    repository.getBySlug( req.params.slug ).then(
        data => {
            res.status(200).send( data );
        }
    ).catch( 
        e => {
            res.status(400).send( e );
        }
    );
    */

    // código com async e await
    try {
        var data = await repository.getBySlug( req.params.slug );
        res.status( 200 ).send( data );

    } catch( e ) {
        res.status( 500 ).send( e );
    }
};

// rota get da minha api dado a rota products criada no outro arquivo e o uso de um parametro.
exports.getById = async (req,res,next) => {
    // coletando os dados ativos  e somente alguns campos.
    // 1 campo filtro do bd e segundo filtro do json
    // usando o id como parametro como filtro para busca no find.
    /*
    repository.getById( req.params.id ).then(
        data => {
            res.status(200).send( data );
        }
    ).catch( 
        e => {
            res.status(400).send( e );
        }
    );
    */
    // código com async e wait.
    try {
        var data = await repository.getById( req.params.id );
        res.status( 200 ).send( data );

    } catch ( e ) {
        res.status( 500 ).send( e );

    }
};

// rota get da minha api dado a rota products criada no outro arquivo e o uso de um parametro.
exports.getByTag = async (req,res,next) => {
    // coletando os dados ativos  e somente alguns campos.
    // 1 campo filtro do bd e segundo filtro do json.
    // usando a tag como parametro com o filtro para busca no find.
    /*
    repository.getByTag( req.params.tag ).then(
        data => {
            res.status(200).send( data );
        }
    ).catch( 
        e => {
            res.status(400).send( e );
        }
    );
    */
   try {
       var data = await repository.getByTag( req.params.tag );
       res.status( 200 ).send( data );

    } catch( e ) {
       res.status( 500 ).send( e );

    }
};

// rota post da minha api dado a rota products criada no outro arquivo.
exports.post = async (req,res,next) => {

    // chamando a variavel com o construtor.
    let contract = new ValidationContract(); 

    // criando mais validações com validator.
    contract.hasMinLen( req.body.title, 3, 'O título precisa ter no mínimo 3 caracteres');
    contract.hasMinLen( req.body.description, 3, 'A description precisa ter no mínimo 3 caracteres');
    contract.hasMinLen( req.body.slug, 3, 'O slug precisa ter no mínimo 3 caracteres');

    // verificando se existe alguns erros.
    if( !contract.isValid() ) {
        // envia uma resposta indicando que houve erro.
        res.status(400).send( contract.errors() ).end();
        return ;
    }

    /*
    repository.create( req.body ).then(
        x => {
            res.status(200).send( { 
                message: "O produto foi cadastrado com sucesso"
            });
        }
    ).catch(
        e =>{
            res.status(400).send( { 
                message: "Falha ao cadastrar produto", 
                data: e 
            });
        }
    );
    */
    try {
        await repository.create( req.body );
        res.status( 200 ).send( {
            message: "O produto foi cadastrado com sucesso",
        });

    } catch( e ) {
        res.status( 500 ).send( {
            message: "Falha ao cadastrar o produto",
            data: e
        });

    }
};

// rota put da minha api dado a rota products criada no outro arquivo.
exports.put = async (req,res,next) => {
    /*
    repository.update( req.params.id,
        $set = {
            title : req.body.title,
            description : req.body.description,
            slug : req.body.slug,
            price : req.body.price
        }
    ).then(
        x => {
            res.status(200).send( { 
                message: "O produto foi atualizado com sucesso"
            });
        }
    ).catch(
        e => {
            res.status(400).send( { 
                message: "O produto foi atualizado com sucesso"
            });
        }
    );
    */
    try {
        await repository.update( req.params.id,
        $set = {
            title : req.body.title,
            description : req.body.description,
            slug : req.body.slug,
            price : req.body.price
        });
        res.status( 200 ).send( {
            message : "Produto atualizado com sucesso!"
        } );

    } catch( e ) {
        res.status( 500 ).send( e );
    }
};

// rota delete da minha api dado a rota products criada no outro arquivo
// precisa de um json com o id do produto para remover o mesmo.
exports.delete = async (req,res,next) => {
    /*
    repository.delete( req.body._id ).then( 
        x => {
            res.status(200).send({
                message: "Produto removido com sucesso!"
            });
        }).catch( 
            e => {
                res.status(400).send({
                    data: e
                });
        });
    */
    try {
        await repository.delete( req.body._id );
        res.status( 200 ).send( {
            message: "Produto removido com sucesso!"
        });

    } catch( e ) {
        res.status( 500 ).send( e );
    }    
};