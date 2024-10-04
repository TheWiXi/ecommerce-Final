const Coupon = require('../models/cuponModel');

class CouponRepository {
    /**
     * Obtiene un cupón específico por su ID.
     * @param {string} id - El ID del cupón que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón encontrado.
     */
    async getCouponRepository(id) {
        try {
            const coupon = new Coupon(); // 🟡 Crea una nueva instancia del modelo Coupon.
            return await coupon.getAnSpecificCoupon(id); // 🟡 Llama al método para obtener un cupón específico.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el cupón.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving coupon' }));
        }
    }

    /**
     * Obtiene todos los cupones, incluyendo información del usuario asociado.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los cupones.
     */
    async getAllCouponRepository() {
        try {
            const coupon = new Coupon(); // 🟡 Crea una nueva instancia del modelo Coupon.
            const query = [
                {
                    $lookup: {
                        from: "usuario", // 🟡 Realiza una búsqueda en la colección 'usuario'.
                        localField: "usuarioId", // 🟡 Campo en la colección de cupones.
                        foreignField: "_id", // 🟡 Campo en la colección de usuarios.
                        as: "usuario_info" // 🟡 Nombre del campo que contendrá la información del usuario.
                    }
                },
                {
                    $unwind: "$usuario_info" // 🟡 Descompone el array de usuario_info para tener un documento por cada usuario.
                },
                {
                    $project: {
                        _id: 1, // 🟡 Incluye el ID del cupón.
                        codigo: 1, // 🟡 Incluye el código del cupón.
                        descuento: 1, // 🟡 Incluye el descuento del cupón.
                        tipo: 1, // 🟡 Incluye el tipo del cupón.
                        fechaExpiracion: 1, // 🟡 Incluye la fecha de expiración del cupón.
                        imagen: 1, // 🟡 Incluye la imagen del cupón.
                        nombreUsuario: "$usuario_info.nombre", // 🟡 Incluye el nombre del usuario asociado.
                        correoUsuario: "$usuario_info.correo", // 🟡 Incluye el correo del usuario asociado.
                    }
                }
            ];
            return await coupon.getAllCoupons(query); // 🟡 Llama al método para obtener todos los cupones con la consulta agregada.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los cupones.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving coupons' }));
        }
    }

    /**
     * Guarda un nuevo cupón en la base de datos.
     * @param {Object} productData - Los datos del cupón que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón guardado.
     */
    async saveCouponRepository(productData) {
        try {
            const coupon = new Coupon(); // 🟡 Crea una nueva instancia del modelo Coupon.
            return await coupon.insertCoupons(productData); // 🟡 Llama al método para insertar un nuevo cupón.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al guardar el cupón.
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving coupon' }));
        }
    }

    /**
     * Elimina un cupón por su ID.
     * @param {string} id - El ID del cupón que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el cupón.
     */
    async deleteCouponsById(id) {
        try {
            const coupon = new Coupon(); // 🟡 Crea una nueva instancia del modelo Coupon.
            return await coupon.deleteCoupons(id); // 🟡 Llama al método para eliminar el cupón por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el cupón.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting coupon' }));
        }
    }

    /**
     * Actualiza un cupón por su ID.
     * @param {string} id - El ID del cupón que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el cupón.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el cupón actualizado.
     */
    async updateCouponById(id, updateData) {
        try {
            const coupon = new Coupon(); // 🟡 Crea una nueva instancia del modelo Coupon.
            return await coupon.updateCoupons(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el cupón.
        } catch (error) {
            console.error("MongoDB error:", error); // 🟡 Registra el error en la consola.
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el cupón.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating coupon' }));
        }
    }
}

module.exports = CouponRepository; // 🟡 Exporta la clase CouponRepository para su uso en otros módulos.
