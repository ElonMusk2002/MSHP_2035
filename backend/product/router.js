const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/api/product/', controller.createProduct); //добавить новый продукт (товар)
router.get('/api/product/', controller.readProduct); //запросить все существующие продукты (товары)
router.put('/api/product/:id', controller.updateProduct); //обновить информацию о продукте (товаре)
router.delete('/api/product/', controller.deleteAllProducts); //удалить все продукты (товары) из БД
router.delete('/api/product/:id', controller.deleteProduct); //удалить конкретный продукт (товар) из БД по ID

module.exports = router;
