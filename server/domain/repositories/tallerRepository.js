const Workshop = require('../models/tallerModel'); // 🟡 Importa el modelo de Workshop.
const { ObjectId } = require('mongodb'); // 🟡 Importa ObjectId de mongodb para trabajar con IDs.

class WorkshopRepository {
    /**
     * Obtiene un taller específico por su ID.
     * @param {string} id - El ID del taller que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller encontrado.
     */
    async getWorkshopById(id) {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            return await workshop.findWorkshopById(id); // 🟡 Llama al método para encontrar el taller por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el taller.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving a workshop ' }));
        }
    }

    /**
     * Guarda un nuevo taller en la base de datos.
     * @param {Object} workshopData - Los datos del taller que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller guardado.
     */
    async saveAWorkshop(workshopData) {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            return await workshop.insertingNewWorkshop(workshopData); // 🟡 Llama al método para insertar un nuevo taller.
        } catch (error) {
            console.error('Error details:', error); // 🟡 Registrar detalles del error.
            // 🟡 Lanza un error personalizado si hay un problema al guardar el taller.
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error saving workshop',
                originalError: error.message // 🟡 Incluir el mensaje original del error.
            }));
        }
    }

    /**
     * Elimina un taller por su ID.
     * @param {string} id - El ID del taller que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el taller.
     */
    async deltingWorkshop(id) {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            return await workshop.deletingAWorkshop(id); // 🟡 Llama al método para eliminar el taller por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el taller.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting workshop' }));
        }
    }

    /**
     * Actualiza un taller por su ID.
     * @param {string} id - El ID del taller que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el taller.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el taller actualizado.
     */
    async WorkshopUpdated(id, updateData) {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            return await workshop.updatingWorkshops(id, updateData); // 🟡 Llama al método para actualizar el taller.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el taller.
            throw new Error(JSON.stringify({ status: 500, message: 'Error upsating workshops' }));
        }
    }

    /**
     * Obtiene talleres por ID de artesano.
     * @param {string} artesanoId - El ID del artesano cuyos talleres se desean recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los talleres encontrados.
     */
    async getByIdArtesano(artesanoId) {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            const id = artesanoId; // 🟡 Almacena el ID del artesano.
            const query = [
                {
                    $match: {
                        artesanoId: new ObjectId(id) // 🟡 Filtra los talleres por el ID del artesano.
                    }
                }
            ];
            const result = await workshop.aggregate(query); // 🟡 Realiza la agregación para obtener los talleres.
            return result; // 🟡 Devuelve el resultado de la agregación.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al consultar.
            throw new Error(JSON.stringify({ status: 400, message: 'Error query' }));
        }
    }

    /**
     * Obtiene todos los talleres con el nombre del artesano.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los talleres y sus nombres de artesano.
     */
    async getWAllWorkshopsWithTeacherNameRepository() {
        try {
            const workshop = new Workshop(); // 🟡 Crea una nueva instancia del modelo Workshop.
            const query = [
                {
                    $lookup: {
                        from: "usuario", // 🟡 Nombre de la colección de usuarios.
                        localField: "artesanoId", // 🟡 Campo que referencia al ID del artesano en talleres.
                        foreignField: "_id", // 🟡 Campo en la colección de usuarios que es el ID.
                        as: "artesanoInfo" // 🟡 Nombre del nuevo campo que contendrá los datos del artesano.
                    }
                },
                {
                    $unwind: "$artesanoInfo" // 🟡 Descompone el array artesanoInfo.
                },
                {
                    $project: { // 🟡 Proyecta los campos deseados en el resultado final.
                        nombre: 1,
                        descripcion: 1,
                        modalidad: 1,
                        fechaInicio: 1,
                        duracion: 1,
                        materialesProporcionados: 1,
                        materialesRequeridos: 1,
                        documental: 1,
                        imagen: 1,
                        "artesanoNombre": "$artesanoInfo.nombre", // 🟡 Obtiene el nombre del artesano.
                        publico: 1
                    }
                }
            ];
            return await workshop.aggregate(query); // 🟡 Realiza la agregación para obtener todos los talleres.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los talleres con nombres de artesano.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving Workshops with teachers names' }));
        }
    }
}

module.exports = WorkshopRepository; // 🟡 Exporta la clase para su uso en otros módulos.
