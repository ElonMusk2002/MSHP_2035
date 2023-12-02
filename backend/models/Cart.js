const mongoose = require('./db');

const cartItemSchema = new mongoose.Schema({
    prodname: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    quantityInStock: { type: Number },
    quantityInCart: { type: Number }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
