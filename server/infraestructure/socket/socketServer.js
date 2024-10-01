const chatService = require('../../application/services/chatService');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado');

        socket.on('join', (username) => {
            socket.username = username;
            io.emit('userJoined', `${username} se ha unido al chat`);
        });

        socket.on('message', async (data) => {
            const message = {
                username: socket.username || 'Anónimo',
                text: data,
                timestamp: new Date()
            };
            
            try {
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
};