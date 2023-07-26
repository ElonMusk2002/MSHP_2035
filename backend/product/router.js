const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/api/product/', controller.createProduct);
router.get('/api/product/', controller.readProduct);
router.put('/api/product/:id', controller.updateProduct);
router.delete('/api/product/', controller.deleteAllProducts);
router.delete('/api/product/:id', controller.deleteProduct);

router.post('/api/cart/', controller.addToCart);
router.get('/api/cart/', controller.getCart);
router.get('/api/cart/item', controller.getCartItem);
router.delete('/api/cart/:id', controller.removeFromCart);
router.delete('/api/cart/', controller.clearCart);

module.exports = router;
