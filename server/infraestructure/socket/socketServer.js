const chatService = require('../../application/services/chatService');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected');

    // Emitir mensajes previos
    chatService.getAllChats().then((chats) => {
      socket.emit('previousMessages', chats);
    });

    // Escuchar nuevos mensajes
    socket.on('sendMessage', (data) => {
      chatService.saveChat(data);
      io.emit('newMessage', data); // Enviar a todos los clientes
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
