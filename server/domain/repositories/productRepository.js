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
}

module.exports = productRepository;