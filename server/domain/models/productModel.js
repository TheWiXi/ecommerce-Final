const Producto = require("../../adapters/database/productSchema");

class Product{
    async findById(id) {
        return await Producto.findById(id).exec(); 
    }

    async getAllproductos() {
        return await Producto.find({}).exec(); 
    }

    async insert(productData) {
        const producto = new Producto(productData);
        return await producto.save(); 
    }

    async findByIdAndUpdate(id, updateData) {
        return await Producto.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); 
    }

    async findByIdAndDelete(id) {
        return await Producto.findByIdAndDelete(id).exec();
    }
}

module.exports = Product;

      


