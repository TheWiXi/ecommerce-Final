const Taller = require("../../adapters/database/tallerSchema");

class Workshop {

    /**
     * Busca un taller por su ID.
     * @param {string} id - El ID del taller a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller encontrado.
     */
    async findWorkshopById(id) {
        return await Taller.findById(id).exec(); // 🟡 Busca el taller por ID y lo devuelve.
    }

    /**
     * Obtiene todos los talleres de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los talleres encontrados.
     */
    async getAllWorkshops() {
        return await Taller.find({}).exec(); // 🟡 Devuelve todos los talleres en la base de datos.
    }

    /**
     * Inserta un nuevo taller en la base de datos.
     * @param {Object} workshopData - Los datos del taller a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller guardado.
     */
    async insertingNewWorkshop(workshopData) {
        const taller = new Taller(workshopData); // 🟡 Crea una instancia del modelo Taller con los datos proporcionados.
        return await taller.save(); // 🟡 Guarda el taller en la base de datos y lo devuelve.
    }

    /**
     * Elimina un taller específico por su ID.
     * @param {string} id - El ID del taller a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async deletingAWorkshop(id) {
        return await Taller.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el taller por ID, devolviendo el resultado.
    }

    /**
     * Actualiza un taller específico por su ID.
     * @param {string} id - El ID del taller a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller actualizado.
     */
    async updatingWorkshops(id, updateData) {
        return await Taller.findByIdAndUpdate(id, updateData, { new: true }).exec(); // 🟡 Busca el taller por ID y lo actualiza, devolviendo el nuevo documento.
    }

    /**
     * Realiza una agregación en los talleres de la base de datos.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la agregación.
     */
    async aggregate(query) {
        return await Taller.aggregate(query).exec(); // 🟡 Realiza una agregación sobre los talleres y devuelve el resultado.
    }
}

module.exports = Workshop; // 🟡 Exporta la clase Workshop para su uso en otros módulos.
