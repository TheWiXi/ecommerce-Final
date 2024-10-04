const express = require('express'); // Importa el módulo express
const router = express.Router(); // Crea un enrutador de Express
const chatController = require('../controllers/chatController'); // Importa el controlador de chat

/**
 * @route GET /history/:userId
 * @param {string} userId - ID del usuario para el que se solicita el historial de mensajes.
 * @returns {Object} - Devuelve el historial de mensajes del usuario.
 */
router.get('/history/:userId', (req, res) => chatController.getMessageHistory(req, res)); // Ruta para obtener el historial de mensajes

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
