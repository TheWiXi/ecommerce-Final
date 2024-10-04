// 🟡 Importa el servicio de chat y readline para manejar entradas de texto en la terminal.
const chatService = require('../../application/services/chatService'); // Servicio para manejar la lógica del chat.
const readline = require('readline'); // Módulo para manejar entradas de línea en la terminal.

// 🟡 Objeto para almacenar los sockets de los usuarios conectados.
const userSockets = {};

// 🟡 Exporta la función que configura el manejo de eventos de Socket.IO.
module.exports = (io) => {
    // 🟡 Escucha el evento de conexión de un nuevo socket.
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado'); // Mensaje de consola al conectarse un usuario.

        // 🟡 Escucha el evento 'message' para recibir mensajes del cliente.
        socket.on('message', async (messageData) => {
            try {
                // Guardar el socket ID y user ID en el objeto userSockets.
                userSockets[socket.id] = messageData.userId;

                // Crea un objeto de mensaje con la información recibida.
                const message = {
                    username: messageData.username,
                    text: messageData.text,
                    timestamp: messageData.timestamp,
                    userId: messageData.userId
                };
                console.log(`Mensaje recibido: ${message.username}: ${message.text}`);
                
                // 🟡 Guardar el mensaje en la base de datos a través del servicio de chat.
                await chatService.saveMessage(message);
                
                // 🟡 Emitir el mensaje a todos los clientes conectados.
                io.emit('message', message);
            } catch (error) {
                console.error('Error al guardar/enviar mensaje:', error); // Mensaje de error en la consola.
                socket.emit('error', 'Error al enviar el mensaje'); // Notifica al cliente que hubo un error.
            }
        });

        // 🟡 Escucha el evento de desconexión del socket.
        socket.on('disconnect', () => {
            if (socket.username) {
                // Emitir un mensaje a todos los clientes si un usuario se desconecta.
                io.emit('userLeft', `${socket.username} ha dejado el chat`);
            }
        });
    });

    // 🟡 Configuración de readline para enviar mensajes desde la terminal.
    const rl = readline.createInterface({
        input: process.stdin, // Entrada de la terminal.
        output: process.stdout // Salida de la terminal.
    });

    // 🟡 Escucha la entrada de la terminal y envía mensajes a los usuarios conectados.
    rl.on('line', async (input) => {
        const socketId = Object.keys(userSockets)[0]; // Obtiene el ID del primer socket conectado.
        if (socketId) {
            const userId = userSockets[socketId]; // Obtiene el userId del socket.
            const serverMessage = {
                texto: input, // Mensaje de texto ingresado en la terminal.
                transmitter: 'server', // Indica que el mensaje proviene del servidor.
                clientid: userId // ID del usuario al que se enviará el mensaje.
            };
            console.log(userId); // Muestra el userId en la consola.
            io.emit("recievedMessage", serverMessage); // Emite el mensaje a los usuarios conectados.
            
            try {
                // 🟡 Guarda el mensaje del servidor en la base de datos.
                await chatService.saveMessage({
                    username: 'Soporte', // Nombre del remitente.
                    text: input, // Texto del mensaje.
                    timestamp: new Date(), // Marca de tiempo actual.
                    userId: userId, // ID del usuario destinatario.
                    isServer: true // Indica que es un mensaje del servidor.
                });
            } catch (error) {
                console.error("Error al manejar el mensaje del servidor:", error); // Mensaje de error en la consola.
            }
            
            console.log(`Mensaje enviado desde la terminal: ${input}`); // Confirma que se envió el mensaje.
        } else {
            console.log('No hay usuarios conectados para enviar el mensaje'); // Mensaje de advertencia si no hay usuarios conectados.
        }
    });
};
