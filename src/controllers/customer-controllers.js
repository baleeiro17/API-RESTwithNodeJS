// gerenciando e modificando as requisições e respostas das minhas rotas.

// chamando uma classe de validators.
const ValidationContract = require("../validator/fluent-validator");

// chamando repositório de códigos.
const repository = require('../repositories/customer-repository');
const emailService = require('../services/email-service');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.post = async (req,res,next) => {

    // chamando a variavel com o construtor.
    let contract = new ValidationContract(); 

    // criando mais validações com validator.
    contract.hasMinLen( req.body.name, 3, 'O nome precisa ter no mínimo 3 caracteres');
    contract.isEmail( req.body.email,'O valor digitado não condiz como um email!');
    contract.hasMinLen( req.body.password, 5, 'O password precisa ter no mínimo 3 caracteres');

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
        await repository.create( {
            name: req.body.name,
            email: req.body.email,
            password: md5( req.body.password + global.SALT_KEY ),
            roles: req.body.roles
        } );

        // enviando um email para customer após realização do cadastro no site.
        await emailService.send( 
            req.body.email,
            'Olá bem-vindo ao Node store-email do lucas.Seu cadastro foi efetuado com sucesso!',
            global.EMAIL_TMPL.replace( '{0}',req.body.name )
        );

        res.status( 200 ).send( {
            message: "O Usuário foi cadastrado com sucesso",
        });

    } catch( error ) {

        res.status( 500 ).send( {
            message: "Falha ao processar a requsição",
            data: error
        });

    }
};

// método em que eu passo alguns dados e gera uma autenticação para que
// o customer possa acessar o determinado código.
exports.authenticate = async (req,res,next) => {

    // pega as informações do customer para gerarmos um token.
    try {

        // perceba que é similar a uma tela de login.
        const customer = await repository.authenticate( {
            email: req.body.email,
            password: md5( req.body.password + global.SALT_KEY )
        } );

        // caso a senha e o email não existam no banco de dados.
        if( !customer ) {
            res.status(404).send( {
                message: "Email e senha inválidos!"
            });

            // para não prosseguir com a requisição.
            return ;
        }

        // gerando um token com email e nome do customer.
        // por isso a formatação em json, evitar a passagem do campo password.
        const token = await authService.generateToken( {
            email: customer.email,
            id: customer._id,
            name: customer.name,
            roles: customer.roles
        } );

        res.status( 201 ).send( {
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                _id: customer._id
            }
        } );

    } catch( error ) {

        res.status( 404 ).send( {
            message: "Falha ao processar a requsição",
            data: error
        });
    }
};

exports.refreshToken = async (req,res,next) => {

    // pega as informações do customer para gerarmos um token.
    try {

        const token =  req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken( token );

        // checando os data do token a partir do id.
        const customer = await repository.getById( data.id );

        // caso a senha e o email não existam no banco de dados.
        if( !customer ) {
            res.status(404).send( {
                message: "Email e senha inválidos!",
            });

            // para não prosseguir com a requisição.
            return ;
        }

        // nesse caso geramos novamente um novo token para 1 dia.
        // refresh token ocorre aqui.
        const tokenData = await authService.generateToken( {
            email: customer.email,
            id: customer._id,
            name: customer.name,
            roles: ["user"]
        } );

        res.status( 201 ).send( {
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name,
                id: customer._id
            }
        } );

    } catch( error ) {

        res.status( 404 ).send( {
            message: "Falha ao processar a requsição",
            data: error
        });
    }
};

