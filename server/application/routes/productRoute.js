const express = require('express');
const ProductController = require("../controllers/productController")
const ProductValidator = require("../validator/productValidator")

const router  = express.Router()
const productController = new ProductController();
const productValidator = new ProductValidator();

router.get("/", productValidator.validateProductDataEmpty(), (req, res) => productController.getProducts(req, res))

module.exports = router;