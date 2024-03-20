const express = require('express'); 
const { checkRole } = require('../middleware/middleware');
const { getProductById, updateProductById, deleteProductById, addProduct, getAllProducts } = require('../controller/product');



const router = express.Router();


router.get('/:id', getProductById); // Get Product by ID
router.put('/:id', updateProductById); // Update Product by ID
router.delete('/:id', deleteProductById); // Delete Product by ID
router.post('/add', addProduct); // Add Product
router.get('/get',getAllProducts)



module.exports= router;