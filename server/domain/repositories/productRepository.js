const Product = require ('../models/productModel');

class ProductRepository{
    async getProduct(productName) {
        try {
        const product = new Product();
        return await product.getProductByName(productName);
        } catch (error) {
        throw new Error(JSON.stringify({status: 400, message: 'Error retrieving product'}));
        }
        }

        async saveProduct(productData) {
            try {
                const product = new Product();
                return await product.postProduct(productData);
            } catch (error) {
                console.error('Error saving product:', error); // Registro del error para depuración
                throw new Error('Error saving product'); // Mensaje de error simplificado
            }
        }

            async updateProductById(id, updateData) {
                try {
                    const product = new Product(); // Asegúrate de que la clase se instancie correctamente
                    const result = await product.putProduct(id, updateData, true);
                    return result;
                } catch (error) {
                    console.error('Error updating product:', error);
                    throw new Error(JSON.stringify({ status: 500, message: 'Error updating product' }));
                }
            }

            async deleteProductById(id) {
                try {
                    const product = new Product();
                    const result = await product.deleteProduct(id);
                    if (result.deletedCount === 0) {
                        throw new Error('Product not found');
                    }
                    return result;
                } catch (error) {
                    throw new Error(JSON.stringify({ status: 404, message: 'Error deleting product' }));
                }
            }

}

module.exports = ProductRepository;



