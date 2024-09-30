const Product = require('../models/productModel');

class productRepository {
    async getById(id) {
        try {
            const product = new Product();
            return await product.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving product'}));
        }
    }

    async getAll() {
        try {
            const product = new Product();
            return await product.getAllproductos();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving products'}));
        }
    }

    async save(productData) {
        try {
            const product = new Product();
            return await product.insert(productData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving product'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const product = new Product();
            return await product.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating product'}));
        }
    }

    async deleteById(id) {
        try {
            const product = new Product();
            return await product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting product'}));
        }
    }

    async searchByName(name) {
        try {
            return await Product.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for products');
        }
    }
    async getProductGroupId(artesanoId) {
        try {
            return await Product.getProductsGroupedByArtesanoWithNames(artesanoId);
        } catch (error) {
            // Log the original error for debugging
            console.error('Database error:', error);
    
            // Throw a more informative error
            throw new Error(JSON.stringify({
                status: 500,
                message: `Error searching for product grouped by artesanoId: ${error.message}`
            }));
        }
    }

    async getProductNamesGroupByArtesanoId(artesanoId, searchTerm) {
        try {
            return await Product.getProductsGroupedByArtesanoWithNames(artesanoId, searchTerm);
        } catch (error) {
            console.error('Database error:', error);
            throw new Error(JSON.stringify({
                status: 500,
                message: `Error searching for name product grouped by artesanoId: ${error.message}`
            }));
        }
    }
    
    
}      

module.exports = productRepository;