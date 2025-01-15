const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/getAllProducts', productsController.getAllProducts);
router.get('/getAllProductsByUser', authenticateToken, productsController.getAllProductsByUser);
router.post('/addProduct', authenticateToken, productsController.addProduct);
router.put('/updateProductsDetails/:id', authenticateToken, productsController.updateProductsDetails);
router.delete('/deleteProduct/:id', productsController.deleteProduct)

module.exports = router;