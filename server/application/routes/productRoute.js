// Importing necessary modules
const express = require('express'); // Importing the Express framework
const ProductController = require("../controllers/productController"); // Importing the ProductController
const ProductValidator = require("../validator/productValidator"); // Importing the ProductValidator

// Creating an Express router instance
const router = express.Router();
const productController = new ProductController(); // Instantiating the ProductController
const productValidator = new ProductValidator(); // Instantiating the ProductValidator

/**
 * @route GET /searchAll
 * @group Products - Operations about products
 * @returns {Array} 200 - An array of all products
 * @returns {Error}  500 - Internal server error
 */
router.get("/searchAll", productValidator.validateProductDataEmpty(), (req, res) => 
    productController.getProductsAll(req, res) // Fetching all products
);

/**
 * @route GET /{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - The id of the product
 * @returns {Object} 200 - The product grouped by artesano with its name
 * @returns {Error}  404 - Product not found
 */
router.get("/:id", (req, res) => 
    productController.getProductsGroupedByArtesanoWithName(req, res) // Fetching product by ID grouped by artesano
);

/**
 * @route GET /searchById/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - The id of the product
 * @returns {Object} 200 - The requested product
 * @returns {Error}  404 - Product not found
 */
router.get("/searchById/:id", productValidator.validateProductDataEmpty(), (req, res) => 
    productController.getproduct(req, res) // Fetching a product by ID
);

/**
 * @route POST /searchDiscounts
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product data for discounts
 * @returns {Array} 200 - An array of products with discounts
 * @returns {Error}  400 - Invalid product data
 */
router.post("/searchDiscounts", productValidator.validateProductCategory(), (req, res) => 
    productController.getproductForDiscounts(req, res) // Fetching products eligible for discounts
);

/**
 * @route POST /
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product data
 * @returns {Object} 201 - The created product
 * @returns {Error}  400 - Invalid product data
 */
router.post("/", productValidator.validateProductData(), (req, res) => 
    productController.createProduct(req, res) // Creating a new product
);

/**
 * @route POST /searchCategory
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product data for category search
 * @returns {Array} 200 - An array of products in the specified category
 * @returns {Error}  400 - Invalid product category
 */
router.post("/searchCategory", productValidator.validateProductCategory(), (req, res) => 
    productController.getproductForcategory(req, res) // Fetching products in a specific category
);

/**
 * @route POST /searchFavorite
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product data for favorite search
 * @returns {Array} 200 - An array of favorite products in the specified category
 * @returns {Error}  400 - Invalid product category
 */
router.post("/searchFavorite", productValidator.validateProductCategory(), (req, res) => 
    productController.getproductForcategoryAndFavorite(req, res) // Fetching favorite products in a specific category
);

/**
 * @route PUT /{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - The id of the product to update
 * @param {Product.model} product.body.required - Updated product data
 * @returns {Object} 200 - The updated product
 * @returns {Error}  400 - Invalid product update data
 */
router.put('/:id', productValidator.validateProductUpdateDataByID(), (req, res) => 
    productController.updateProduct(req, res) // Updating a product by ID
);

/**
 * @route DELETE /{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - The id of the product to delete
 * @returns {Object} 204 - Product deleted successfully
 * @returns {Error}  404 - Product not found
 */
router.delete('/:id', productValidator.validateProductId(), (req, res) => 
    productController.deleteProduct(req, res) // Deleting a product by ID
);

// Exporting the router for use in other parts of the application
module.exports = router;
