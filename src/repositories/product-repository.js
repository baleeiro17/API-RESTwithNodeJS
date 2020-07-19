// criando um repositório de códigos get,post,put and delete.

const mongoose = require("mongoose");

const Product = mongoose.model("Product");

// perceba que todas essas funções podem ser reaproveitadas.

// async before a function means one simple thing: a function always returns a promise.
// The keyword await makes JavaScript wait until that promise settles and returns its result.
exports.get = async ()=> {
    const res = await Product.find( {
        active: true 
    },'title slug price' );
    return res;
}

exports.getBySlug = async ( slug ) => {
    const res = await Product.findOne( { 
        active: true,
        slug: slug 
    },'title description slug price tags' );
    return res;
}

exports.getById = async ( id ) => {
    const res = await Product.findById( id );
    return res;
}

exports.getByTag = async ( tag ) => {
    const res = await Product.find( { 
        tags: tag, 
        active: true 
    });
    return res;
}

exports.create = async ( data ) => {
    var product = new Product( data );
    await product.save();
}

exports.update = async ( id, data ) => {
    await Product.findByIdAndUpdate( id, data );
}

exports.delete = async ( id ) => {
    await Product.findOneAndRemove( { _id: id } );
}