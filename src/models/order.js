// nesse arquivo vamos ter os esquemas para nosso banco de dados sql.
const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// criação do esquema.
const schema = new Schema({
    // referenciado um outro esquema do mongoose.
    // nesse caso o customer
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status : {
        type: String,
        required: true,
        enum: ['created','done'],
        default: 'created'
    },
    // no caso um array com outros vários itens e esses itens tem caracteristicas especificas.
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        // referência outro esquema(objeto) do mongoose.
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
    /*
        // um pedido com cada item está ligado a um customer.
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }]
    */
});

// perceba que no fim teremos um json sendo adicionado ao nosso banco.
// troca de jsons entre os elementos.

//exportação do esquema.
// Customer é o nome do esquema criado.
module.exports = mongoose.model('Order',schema);