const { validationResult } = require("express-validator")
const MessageService = require("../services/messageService")

/**
 * @class MessageController
 * @description Controlador para manejar las operaciones relacionadas con los mensajes.
 */
class MessageController {
    constructor() {
        // Instancia del servicio de mensajes
        this.messageService = new MessageService()
    }

    /**
     * @async
     * @function getMessageController
     * @description Controlador para obtener un mensaje específico por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getMessageController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener el mensaje utilizando el servicio
            const message = await this.messageService.getMessageService(req.params.id);
            // Devolver el mensaje encontrado
            res.status(200).json(message);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getMessagesController
     * @description Controlador para obtener todos los mensajes.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getMessagesController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener todos los mensajes utilizando el servicio
            const message = await this.messageService.getAllMessagesService();
            // Devolver todos los mensajes
            res.status(200).json(message);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function creatingMessagesController
     * @description Controlador para crear un nuevo mensaje.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async creatingMessagesController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Crear un nuevo mensaje utilizando el servicio
            const message = await this.messageService.creatingMessages(req.body);
            // Devolver el nuevo mensaje creado
            res.status(201).json(message);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function deleteMessageController
     * @description Controlador para eliminar un mensaje por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async deleteMessageController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Eliminar el mensaje utilizando el servicio
            const message = await this.messageService.deleteMessagesRepository(req.params.id);
            // Devolver un estado 204 sin contenido
            res.status(204).json(message);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function updateMessagesController
     * @description Controlador para actualizar un mensaje por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async updateMessagesController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Actualizar el mensaje utilizando el servicio
            const message = await this.messageService.updateMessagesService(req.params.id, req.body);
            // Devolver el mensaje actualizado
            res.status(200).json(message);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = MessageController;
