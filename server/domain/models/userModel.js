const user = require("../../adapters/database/userSchema");
const mongoose = require('mongoose');

class User {
    /**
     * Busca un usuario por su ID.
     * @param {string} id - El ID del usuario a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario encontrado.
     */
    async findById(id) {
        return await user.findById(id).exec(); // 🟡 Busca el usuario por ID y lo devuelve.
    }

    /**
     * Obtiene todos los usuarios de tipo "artesano".
     * @returns {Promise} - Devuelve una promesa que se resuelve con los usuarios encontrados.
     */
    async getAllUsers() {
        return await user.find({ tipo: "artesano" }).exec(); // 🟡 Devuelve todos los usuarios con tipo "artesano".
    }

    /**
     * Inserta un nuevo usuario en la base de datos.
     * @param {Object} productData - Los datos del usuario a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario guardado.
     */
    async insert(productData) {
        const usercreate = new user(productData); // 🟡 Crea una nueva instancia del modelo User con los datos proporcionados.
        return await usercreate.save(); // 🟡 Guarda el usuario en la base de datos y lo devuelve.
    }

    /**
     * Actualiza un usuario específico por su ID.
     * @param {string} id - El ID del usuario a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndUpdate(id, updateData) {
        return await user.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el usuario por ID y lo actualiza, devolviendo el nuevo documento.
    }

    /**
     * Actualiza el carrito de compras de un usuario específico por su ID.
     * @param {string} id - El ID del usuario.
     * @param {Object} updateData - Los datos a añadir al carrito.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndUpdateCarrito(id, updateData) {
        return await user.findByIdAndUpdate(id, { $addToSet: { compras: updateData.compras } }, { new: true, useFindAndModify: false }).exec(); // 🟡 Añade un producto al carrito sin duplicados y devuelve el usuario actualizado.
    }

    /**
     * Actualiza la lista de favoritos de un usuario específico por su ID.
     * @param {string} id - El ID del usuario.
     * @param {Object} updateData - Los datos a añadir a la lista de favoritos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndUpdateFavorite(id, updateData) {
        return await user.findByIdAndUpdate(id, { $addToSet: { favoritos: updateData.favoritos } }, { new: true, useFindAndModify: false }).exec(); // 🟡 Añade un producto a la lista de favoritos sin duplicados y devuelve el usuario actualizado.
    }

    /**
     * Elimina todos los productos del carrito de compras de un usuario específico por su ID.
     * @param {string} id - El ID del usuario.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndDeleteCarrito(id) {
        return await user.findByIdAndUpdate(id, { $set: { compras: [] } }, { new: true, useFindAndModify: false }).exec(); // 🟡 Limpia el carrito de compras del usuario y devuelve el usuario actualizado.
    }

    /**
     * Elimina un producto específico del carrito de compras de un usuario.
     * @param {string} id - El ID del usuario.
     * @param {Object} updateData - Los datos del producto a eliminar del carrito.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndDeleteProductCarrito(id, updateData) {
        return await user.findByIdAndUpdate(id, { $pull: { compras: { $in: updateData.compras } } }, { new: true, useFindAndModify: false }).exec(); // 🟡 Elimina el producto del carrito de compras y devuelve el usuario actualizado.
    }

    /**
     * Elimina un producto específico de la lista de favoritos de un usuario.
     * @param {string} id - El ID del usuario.
     * @param {Object} updateData - Los datos del producto a eliminar de favoritos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndDeleteProductFavorite(id, updateData) {
        return await user.findByIdAndUpdate(id, { $pull: { favoritos: { $in: updateData.favoritos } } }, { new: true, useFindAndModify: false }).exec(); // 🟡 Elimina el producto de la lista de favoritos y devuelve el usuario actualizado.
    }

    /**
     * Elimina un usuario específico por su ID.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async findByIdAndDelete(id) {
        return await user.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el usuario por ID, devolviendo el resultado.
    }

    /**
     * Realiza una agregación en los usuarios de la base de datos.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la agregación.
     */
    async aggregate(query) {
        return await user.aggregate(query).exec(); // 🟡 Realiza una agregación sobre los usuarios y devuelve el resultado.
    }
}

module.exports = User; // 🟡 Exporta la clase User para su uso en otros módulos.
