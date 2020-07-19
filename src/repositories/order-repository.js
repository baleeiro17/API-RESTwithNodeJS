const mongoose = require("mongoose");

const Order = mongoose.model("Order");

exports.create = async ( data ) => {
    var order = new Order( data );
    await order.save();
}

exports.get = async () => {
    // traz do json e filtra somente os campos que queremos.
    const res = await Order.find({}, 'number status customer items')
        .populate('customer','name')
        .populate('items.product','title slug');
    return res;
}