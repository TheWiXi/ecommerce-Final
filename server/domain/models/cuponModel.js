const Cupon = require("../../adapters/database/cuponSchema");

class Coupon {

    /**
     * Obtiene un cupón específico por su ID.
     * @param {string} id - El ID del cupón a obtener.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón encontrado.
     */
    async getAnSpecificCoupon(id) {
        return await Cupon.findById(id).exec(); // 🟡 Busca el cupón por ID y lo devuelve.
    }

    /**
     * Obtiene todos los cupones aplicando una consulta.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los cupones encontrados.
     */
    async getAllCoupons(query) {
        return await Cupon.aggregate(query).exec(); // 🟡 Aplica la consulta de agregación y devuelve los cupones.
    }

    /**
     * Inserta un nuevo cupón en la base de datos.
     * @param {Object} productData - Los datos del cupón a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón guardado.
     */
    async insertCoupons(productData) {
        const cupon = new Cupon(productData); // 🟡 Crea una instancia del modelo Cupon con los datos proporcionados.
        return await cupon.save(); // 🟡 Guarda el cupón en la base de datos y lo devuelve.
    }

    /**
     * Elimina un cupón específico por su ID.
     * @param {string} id - El ID del cupón a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async deleteCoupons(id) {
        return await Cupon.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el cupón por ID, devolviendo el resultado.
    }

    /**
     * Actualiza un cupón específico por su ID.
     * @param {string} id - El ID del cupón a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón actualizado.
     */
    async updateCoupons(id, updateData) {
        return await Cupon.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el cupón por ID y lo actualiza, devolviendo el nuevo documento.
    }

}

module.exports = Coupon; // 🟡 Exporta la clase Coupon para su uso en otros módulos.
