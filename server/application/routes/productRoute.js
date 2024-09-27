const express = require('express');
const ProductController = require("../controllers/productController")
const ProductValidator = require("../validator/productValidator")
const {auth} = require('../middlewares/authenticateToken')

const router  = express.Router()
const productController = new ProductController();
const productValidator = new ProductValidator();

router.get("/searchAll", auth, productValidator.validateProductDataEmpty(), (req, res) => productController.getProducts(req, res))
router.post("/", auth, productValidator.validateProductData(), (req, res) => productController.createProduct(req, res))
router.post("/searchCategory", productValidator.validateProductCategory(), (req, res) => productController.getproductForcategory(req, res))
router.put('/:id', auth, productValidator.validateProductUpdateDataByID(), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', auth, productValidator.validateProductId(), (req, res) => productController.deleteProduct(req, res));

module.exports = router;