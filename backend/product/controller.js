const express = require('express');
const Product = require('../models/Product');
const faker = require('faker');

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
            quantityInStock: faker.datatype.number({min: 0, max: 100}),
            reviews: Array.from({length: faker.datatype.number({min: 0, max: 10})}, () => ({
                avatar: faker.image.avatar(),
                nickname: faker.internet.userName(),
                stars: faker.datatype.number({min: 1, max: 5}),
                text: faker.lorem.sentences(),
                image: faker.datatype.boolean ? faker.image.image() : undefined
            }))
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}


module.exports.readProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({message: "Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}