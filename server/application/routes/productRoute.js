const express = require('express');
const ProductController = require("../controllers/productController")
const ProductValidator = require("../validator/productValidator")
//const {auth} = require('../middlewares/authenticateToken')

const router  = express.Router()
const productController = new ProductController();
const productValidator = new ProductValidator();

router.get("/searchAll", productValidator.validateProductDataEmpty(), (req, res) => productController.getProductsAll(req, res))
router.get("/:id", (req, res) => productController.getProductsGroupedByArtesanoWithName(req, res));
router.get("/searchById/:id",  productValidator.validateProductDataEmpty(), (req, res) => productController.getproduct(req, res))
router.post("/", productValidator.validateProductData(), (req, res) => productController.createProduct(req, res))
router.post("/searchCategory", productValidator.validateProductCategory(), (req, res) => productController.getproductForcategory(req, res))
router.post("/searchDiscounts", productValidator.validateProductCategory(), (req, res) => productController.getproductForDiscounts(req, res))
router.put('/:id', productValidator.validateProductUpdateDataByID(), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', productValidator.validateProductId(), (req, res) => productController.deleteProduct(req, res));

module.exports = router;
    