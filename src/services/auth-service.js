// arquivo com as principais funções de autenticação e decodificação de tokens no node.js

const jwt = require('jsonwebtoken');

// cria um token com duração de 1 dia com global salt.
// data dados que vamos inputar dentro do token no caso email.
exports.generateToken = async( data ) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

// função que decodifica o token.
exports.decodeToken = async( token ) => {
    const data = await jwt.verify( token, global.SALT_KEY );
    return data;
}

// função de autenticação do token repassado.
// criação de restrições de rotas feitas pelo usuário.
exports.authorize = function (req, res, next) {

    // recebe o token via requisição http.
    // essa função atua como um interceptador de rota.
    // 1º via json, 2º url e 3º x-acess no postman.
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // se o token não existir encaminha um erro não envia um resposta pois foi uma
    // interceptação de rota.
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        // verifica a autenticidade do token ou seja se é possivel descriptar o mesmo e 
        // também verifica a validade do mesmo.
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                // se o token é válido prosegue a rota, ou seja next é a rota.
                // decoded contém as informaçaões repassadas dentro do token(encriptadas dentro do mesmo)
                // a data da função generate.
                next();
            }
        });
    }
};

// nova restrição da rota feita pelo usuário.
exports.isAdmin = function (req, res, next) {

    // recebe o token via requisição http.
    // essa função atua como um interceptador de rota.
    // 1º via json, 2º url e 3º x-acess no postman.
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // se o token não existir encaminha um erro não envia um resposta pois foi uma
    // interceptação de rota.
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        // verifica a autenticidade do token ou seja se é possivel descriptar o mesmo e 
        // também verifica a validade do mesmo.
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                
                // verifica se no token decodificado existe o campo roles admin.
                if( decoded.roles.includes('admin') ){
                    next();
                }
                else {
                    res.status(403).json({
                        message: 'Acesso restrito ao admin'
                    });
                }
            }
        });
    }
};