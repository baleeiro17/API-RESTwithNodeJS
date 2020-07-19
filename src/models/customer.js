// nesse arquivo vamos ter os esquemas para nosso banco de dados sql.
const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// criação do esquema.
const schema = new Schema({
    // cria um _id automaticamente
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles : [{
        type: String,
        required: true,
        enum: ['user','admin'],
        default: 'user'
    }]
});

// perceba que no fim teremos um json sendo adicionado ao nosso banco.
// troca de jsons entre os elementos.

//exportação do esquema.
// Customer é o nome do esquema criado.
module.exports = mongoose.model('Customer',schema);