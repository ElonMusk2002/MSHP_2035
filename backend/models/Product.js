const mongoose = require('./db');

const reviewSchema = new mongoose.Schema({
    avatar: { type: String },
    nickname: { type: String },
    stars: { type: Number },
    text: { type: String },
    image: { type: String }
});

const prodSchema = new mongoose.Schema({
    prodname: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    quantityInStock: { type: Number },
    reviews: [reviewSchema]
});

const Product = mongoose.model('Product', prodSchema);

module.exports = Product;