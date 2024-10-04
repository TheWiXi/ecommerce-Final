const Producto = require("../../adapters/database/productSchema");
const mongoose = require('mongoose');

class Product {
    /**
     * Busca un producto por su ID.
     * @param {string} id - El ID del producto a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto encontrado.
     */
    async findById(id) {
        return await Producto.findById(id).exec(); // 🟡 Busca el producto por ID y lo devuelve.
    }

    /**
     * Obtiene todos los productos de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los productos encontrados.
     */
    async getAllproductos() {
        return await Producto.find({}).exec(); // 🟡 Devuelve todos los productos en la base de datos.
    }

    /**
     * Inserta un nuevo producto en la base de datos.
     * @param {Object} productData - Los datos del producto a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto guardado.
     */
    async insert(productData) {
        const producto = new Producto(productData); // 🟡 Crea una instancia del modelo Producto con los datos proporcionados.
        return await producto.save(); // 🟡 Guarda el producto en la base de datos y lo devuelve.
    }

    /**
     * Actualiza un producto específico por su ID.
     * @param {string} id - El ID del producto a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto actualizado.
     */
    async findByIdAndUpdate(id, updateData) {
        return await Producto.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el producto por ID y lo actualiza, devolviendo el nuevo documento.
    }

    /**
     * Elimina un producto específico por su ID.
     * @param {string} id - El ID del producto a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async findByIdAndDelete(id) {
        return await Producto.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el producto por ID, devolviendo el resultado.
    }

    /**
     * Realiza una agregación en los productos de la base de datos.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la agregación.
     */
    async aggregate(query) {
        return await Producto.aggregate(query).exec(); // 🟡 Realiza una agregación sobre los productos y devuelve el resultado.
    }
}

module.exports = Product; // 🟡 Exporta la clase Product para su uso en otros módulos.
