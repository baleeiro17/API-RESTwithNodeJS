
// cria um arquivo com as opções de config e coloca a chave para envio dos emails.

var sendgrid = require( '@sendgrid/mail' );
sendgrid.setApiKey( process.env.SENDGRID_API_KEY );

exports.send = async ( to, subject, body ) => {
    sendgrid.send({
        to : to,
        from : 'lucasdominato2@gmail.com',
        subject : subject,
        html: body
    });
}
