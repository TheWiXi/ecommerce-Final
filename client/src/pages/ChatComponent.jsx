import React, { useState, useEffect } from 'react';
import socket from '../socket';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Obtener mensajes previos
    socket.on('previousMessages', (chats) => {
      setMessages(chats);
    });

    // Recibir nuevos mensajes
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = { message: newMessage, user: 'User' }; // Cambiar 'User' por datos de usuario reales
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'User' ? 'self' : ''}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="send-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
