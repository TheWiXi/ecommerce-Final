const chatService = require('../../application/services/chatService');
const readline = require('readline');

const userSockets = {};

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado');

        socket.on('message', async (messageData) => {
            try {
                // Guardar el socket ID y user ID
                userSockets[socket.id] = messageData.userId;

                const message = {
                    username: messageData.username,
                    text: messageData.text,
                    timestamp: messageData.timestamp,
                    userId: messageData.userId
                };
                console.log(`Mensaje recibido: ${message.username}: ${message.text}`);
                
                
                // Guardar el mensaje en la base de datos
                await chatService.saveMessage(message);
                
                // Emitir el mensaje a todos los clientes
                io.emit('message', message);
            } catch (error) {
                console.error('Error al guardar/enviar mensaje:', error);
                socket.emit('error', 'Error al enviar el mensaje');
            }
        });

        socket.on('disconnect', () => {
            if (socket.username) {
                io.emit('userLeft', `${socket.username} ha dejado el chat`);
            }
        });
    });

    // Configuración de readline para enviar mensajes desde la terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (input) => {
        const socketId = Object.keys(userSockets)[0];
        if (socketId) {
            const userId = userSockets[socketId];
            const serverMessage = {
                texto: input,
                transmitter: 'server',
                clientid: userId
            };
            console.log(userId)
            io.emit("recievedMessage", serverMessage);
            
            try {
                await chatService.saveMessage({
                    username: 'Soporte',
                    text: input,
                    timestamp: new Date(),
                    userId: userId,
                    isServer: true
                });
            } catch (error) {
                console.error("Error al manejar el mensaje del servidor:", error);
            }
            
            console.log(`Mensaje enviado desde la terminal: ${input}`);
        } else {
            console.log('No hay usuarios conectados para enviar el mensaje');
        }
    });

};