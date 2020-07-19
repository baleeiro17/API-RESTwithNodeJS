// criando minha api utilizando um servidor http.
// a mesma vai funcionar por meio do get e post entre outros.
const http = require('http');
const debug = require('debug')('balta:server');
const app = require('../src/app');

// cria uma aplicação com express.
const port = normalizePort(process.env.PORT || '3000');

// setando a porta do servidor.
app.set( 'port', port );

// criando o servidor a partir do arquivo de aplicação.
const server = http.createServer( app );

server.listen( port );
server.on('error',onError);
server.on('listening',onListening);
console.log("API funcionando na porta:"+port);

// normalizando a porta ou checando se a mesma está disponivel.
function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
}

// verificando erros de servidores.
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

// colocando o debug em ação.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}