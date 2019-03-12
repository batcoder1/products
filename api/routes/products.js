const express = require('express');
const products = require('../controllers/products');
const router = express.Router();

router.route('/').get(products.findAll);
router.route('/create').post(products.createProduct);
router.route('/delete').post(products.deleteProduct);

module.exports = router;
