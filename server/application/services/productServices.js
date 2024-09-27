const ProductRepository = require("../../domain/repositories/productRepository")

class productService {
    constructor(){
        this.productService = new ProductRepository()
    }

    async getProductById(id){
        const product = await this.productService.getById(id)
        if(!product){
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product
    }

    async getProductCategory(id){
        const product = await this.productService.getByCategory(id)
        if(!product){
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product
    }

    async getAllProduct(){
        const product = await this.productService.getAll()
        if(!product){
            throw new Error(JSON.stringify({status: 404, message: 'Products not found'}));
        }
        return product
    }

    async createProduct(data) {
        const product = await this.productService.save(data);
        if(!product){
            throw new Error(JSON.stringify({status: 404, message: 'Error entering product'}));
        }
        return product
    }

    async updateProduct(id, data) {
        const updatedProduct = await this.productService.updateById(id, data);
        if (!updatedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be updated'}));
        }
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await this.productService.deleteById(id);
        if (!deletedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be deleted'}));
        }        
        return deletedProduct;
    }

}

module.exports = productService