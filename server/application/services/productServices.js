// Importing the ProductRepository to handle product data operations
const ProductRepository = require("../../domain/repositories/productRepository");

/**
 * ProductService - Service class to handle product-related operations.
 */
class productService {
    constructor() {
        this.productService = new ProductRepository(); // Initializing ProductRepository instance
    }

    /**
     * Retrieves a product by its ID.
     * @param {string} id - The ID of the product to retrieve.
     * @returns {Promise<Object>} - The product object.
     * @throws {Error} - If the product is not found.
     */
    async getProductById(id) {
        const product = await this.productService.getById(id); // Fetching product from repository
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if product not found
        }
        return product; // Returning the found product
    }

    /**
     * Retrieves products by category.
     * @param {string} category - The category of the products to retrieve.
     * @returns {Promise<Array>} - An array of product objects.
     * @throws {Error} - If products in the category are not found.
     */
    async getProductCategory(category) {
        const product = await this.productService.getByCategory(category); // Fetching products by category
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if no products found
        }
        return product; // Returning the found products
    }

    /**
     * Retrieves favorite products by category.
     * @param {string} category - The category of the products to retrieve.
     * @returns {Promise<Array>} - An array of favorite product objects.
     * @throws {Error} - If products are not found.
     */
    async getProductCategoryAndFavorite(category) {
        const product = await this.productService.getByCategoryAndFavorite(category); // Fetching favorite products by category
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if no products found
        }
        return product; // Returning the found favorite products
    }

    /**
     * Retrieves products with discounts by category.
     * @param {string} category - The category of the products to retrieve.
     * @returns {Promise<Array>} - An array of product objects with discounts.
     * @throws {Error} - If products are not found.
     */
    async getProductsDiscounts(category) {
        const product = await this.productService.getByCategoryDiscounts(category); // Fetching products with discounts
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if no products found
        }
        return product; // Returning the products with discounts
    }

    /**
     * Retrieves all products.
     * @returns {Promise<Array>} - An array of all product objects.
     * @throws {Error} - If no products are found.
     */
    async getAllProduct() {
        const product = await this.productService.getAll(); // Fetching all products from repository
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Products not found' })); // Error if no products found
        }
        return product; // Returning the array of products
    }

    /**
     * Creates a new product.
     * @param {Object} data - The data of the product to create.
     * @returns {Promise<Object>} - The created product object.
     * @throws {Error} - If there is an error entering the product.
     */
    async createProduct(data) {
        const product = await this.productService.save(data); // Saving the new product
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error entering product' })); // Error if product creation fails
        }
        return product; // Returning the created product
    }

    /**
     * Updates a product by its ID.
     * @param {string} id - The ID of the product to update.
     * @param {Object} data - The data to update the product with.
     * @returns {Promise<Object>} - The updated product object.
     * @throws {Error} - If the product is not found or could not be updated.
     */
    async updateProduct(id, data) {
        const updatedProduct = await this.productService.updateById(id, data); // Updating the product in the repository
        if (!updatedProduct) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be updated' })); // Error if product update fails
        }
        return updatedProduct; // Returning the updated product
    }

    /**
     * Deletes a product by its ID.
     * @param {string} id - The ID of the product to delete.
     * @returns {Promise<Object>} - The deleted product object.
     * @throws {Error} - If the product is not found or could not be deleted.
     */
    async deleteProduct(id) {
        const deletedProduct = await this.productService.deleteById(id); // Deleting the product from the repository
        if (!deletedProduct) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be deleted' })); // Error if product deletion fails
        }
        return deletedProduct; // Returning the deleted product
    }

    /**
     * Retrieves products grouped by artesano ID.
     * @param {string} artesanoId - The ID of the artesano whose products to retrieve.
     * @returns {Promise<Array>} - An array of grouped product objects.
     * @throws {Error} - If grouped products are not found.
     */
    async getProductGropedService(artesanoId) {
        const product = await this.productService.getProductGroupId(artesanoId); // Fetching grouped products by artesano ID
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product grouped not found' })); // Error if grouped products not found
        }
        return product; // Returning the grouped products
    }

    /**
     * Retrieves products grouped by artesano ID with their names.
     * @param {string} artesanoId - The ID of the artesano whose product names to retrieve.
     * @returns {Promise<Array>} - An array of product name objects.
     * @throws {Error} - If product names are not found.
     */
    async getProductsGroupedByArtesanoWithNames(artesanoId) {
        const product = await this.productService.getProductNamesGroupByArtesanoId(artesanoId); // Fetching product names grouped by artesano ID
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product name not found' })); // Error if product names not found
        }
        return product; // Returning the product names
    }
}

// Exporting the productService class for use in other parts of the application
module.exports = productService;
