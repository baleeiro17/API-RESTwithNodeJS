// variaveis para geração do tolkien(salt key) e md5 encryption além do envio de emails.
global.SALT_KEY = 'variável do servidor para geração do token';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';

module.exports = {
    connectionString: 'string de conexão do mongodb',
    sendgridKey: 'key do send grid', // enviar email.
    containerConnectionString: 'TBD' // armazenar as imagens do produto no azure.
}