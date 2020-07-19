// nesse arquivo vamos ter os esquemas para nosso banco de dados sql.
const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// criação do esquema.
const schema = new Schema({
    // cria um _id automaticamente
    title: {
        type: String,
        required: true,
        trim: true // retira os espaços do titulo
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true, // indice
        unique: true // indica que esse valor tem que ser único.
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true // opção default para esse valor.
    },
    tags: [{
        type: String,  // tags é um vetor com varias strings.
        required: true
    }]
});

// perceba que no fim teremos um json sendo adicionado ao nosso banco.
// troca de jsons entre os elementos.

//exportação do esquema.
// Product é o nome do esquema criado.
module.exports = mongoose.model('Product',schema);