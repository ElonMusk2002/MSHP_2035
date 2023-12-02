const express = require('express');
const Product = require('../models/Product');
const faker = require('faker');
const CartItem = require('../models/Cart');

module.exports.getCart = async (req, res) => {
    try {
        const { query } = req;
        let cart;
        if (query.prodname) {
            cart = await CartItem.find({ prodname: query.prodname });
        } else {
            cart = await CartItem.find();
        }
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Найти товар по ID
        const product = await Product.findById(productId);

        // Проверить, есть ли товар уже в корзине
        const existingCartItem = await CartItem.findOne({ prodname: product.prodname });

        if (existingCartItem) {
            // Обновить количество товара в корзине
            existingCartItem.quantityInCart += quantity;
            await existingCartItem.save();
            res.status(200).json({ message: 'Product quantity updated' });
        } else {
            // Создать новый элемент корзины
            const cartItem = new CartItem({
                prodname: product.prodname,
                price: product.price,
                description: product.description,
                image: product.image,
                quantityInStock: product.quantityInStock,
                quantityInCart: quantity
            });

            // Сохранить элемент корзины
            await cartItem.save();

            res.status(201).json({ message: 'Product added to cart' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        // Найти элемент корзины по ID и удалить его
        await CartItem.findByIdAndDelete(id);

        res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.clearCart = async (req, res) => {
    try {
        // Очистить корзину
        await CartItem.deleteMany({});

        res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports.createProduct = async (req, res) => {
    try {
        const { prodname, subprodname, price, description, quantityInStock, reviews } = req.body;

        const newProduct = new Product({
            prodname: prodname || faker.commerce.product(),
            subprodname: subprodname || faker.commerce.productName(),
            price: price || faker.commerce.price(),
            description: description || faker.commerce.productDescription(),
            image: `https://source.unsplash.com/random/800x600?product=${encodeURIComponent(prodname)}`,
            quantityInStock: quantityInStock || faker.datatype.number({ min: 0, max: 100 }),
            reviews: reviews || Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, () => ({
                avatar: faker.image.avatar(),
                nickname: faker.internet.userName(),
                stars: faker.datatype.number({ min: 1, max: 5 }),
                text: faker.lorem.sentences(),
                image: `https://source.unsplash.com/random/800x600?review=${encodeURIComponent(faker.lorem.word())}`
            }))
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

//CRUD
module.exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            prodname: faker.commerce.product(),
            subprodname: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            image: faker.image.fashion(),
            quantityInStock: faker.datatype.number({ min: 0, max: 100 }),
            reviews: Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, () => ({
                avatar: faker.image.avatar(),
                nickname: faker.internet.userName(),
                stars: faker.datatype.number({ min: 1, max: 5 }),
                text: faker.lorem.sentences(),
                image: faker.datatype.boolean ? faker.image.image() : undefined
            }))
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports.readProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: "Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.getCartItem = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantityInCart, 0);
        res.status(200).json({ totalQuantity });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}