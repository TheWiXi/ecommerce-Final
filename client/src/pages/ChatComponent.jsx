import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { Send } from 'lucide-react';
import { Muesca } from "../components/Muesca"
import { useLoaderData, useNavigate } from "react-router-dom"


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const socketRef = useRef();
    const chatContainerRef = useRef(null);
    // const data = useLoaderData();
    const navigate = useNavigate();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    useEffect(() => {
        const token = getCookieValue('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserData(decodedToken);

            // Cargar historial de mensajes
            fetchMessageHistory(decodedToken.id);
        }

        socketRef.current = io('http://localhost:3000');

        socketRef.current.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socketRef.current.on('recievedMessage', (serverMessage) => {
            setMessages(prevMessages => [...prevMessages, serverMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            scrollToBottom();
        }
    }, [messages, isLoading]);

    const fetchMessageHistory = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/chat/history/${userId}`);
            if (response.ok) {
                const history = await response.json();
                setMessages(history);
            } else {
                console.error('Error al obtener el historial de mensajes');
            }
        } catch (error) {
            console.error('Error al cargar el historial:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim() && userData) {
            const messageData = {
                text: messageInput,
                username: userData.nombre,
                userId: userData.id,
                timestamp: new Date()
            };
            socketRef.current.emit('message', messageData);
            setMessageInput('');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className='h-[100dvh] relative overflow-x-hidden'>
            <div className='sticky top-0 z-10'>
            <Muesca color='3D3D3D' />
                <header className="flex gap-[10px] justify-center items-center w-full h-[100px] bg-[#D9D9D9] text-blanco font-semibold">
                    <svg width="35" height="35" viewBox="0 0 112 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.8746 16.1991C11.8554 16.1991 5.39186 23.3707 5.39186 32.2684V81.5043C5.39186 90.4019 11.8554 97.5736 19.8746 97.5736H26.0148C27.2276 97.5736 28.2108 98.6645 28.2108 100.01V113.933L47.6172 98.0494C47.9948 97.7403 48.4516 97.5736 48.9207 97.5736H81.7992C89.8184 97.5736 96.282 90.4019 96.282 81.5043V49.0347C96.282 47.6891 97.2652 46.5982 98.478 46.5982C99.6907 46.5982 100.674 47.6891 100.674 49.0347V81.5043C100.674 93.0932 92.2439 102.447 81.7992 102.447H49.643L27.3184 120.718C26.6515 121.264 25.7646 121.347 25.025 120.932C24.2853 120.518 23.8189 119.677 23.8189 118.757V102.447H19.8746C9.42979 102.447 1 93.0932 1 81.5043V32.2684C1 20.6794 9.4298 11.3262 19.8746 11.3262H63.9446C65.1573 11.3262 66.1405 12.417 66.1405 13.7627C66.1405 15.1083 65.1573 16.1991 63.9446 16.1991H19.8746Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M105.524 15.3446L96.6558 6.476C92.6886 2.50888 86.2567 2.50888 82.2896 6.476L73.421 15.3446C69.4538 19.3117 69.4538 25.7437 73.421 29.7108L82.2896 38.5794C86.2567 42.5465 92.6886 42.5465 96.6558 38.5794L105.524 29.7108C109.491 25.7437 109.491 19.3117 105.524 15.3446ZM85.4801 9.66658C87.6851 7.46157 91.2602 7.46157 93.4652 9.66658L102.334 18.5352C104.539 20.7402 104.539 24.3152 102.334 26.5202L93.4652 35.3888C91.2602 37.5938 87.6851 37.5938 85.4801 35.3888L76.6115 26.5202C74.4065 24.3152 74.4065 20.7402 76.6115 18.5352L85.4801 9.66658Z" fill="black" stroke="black" /></svg>
                    
                    <p> Chat con Soporte </p>
                </header>
            </div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative px-[20px] py-[30px] min-h-[75%]">
                {messages.map((message, index) => (
                    <div key={index} 
                         className={`flex ${message.transmitter === 'server' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.transmitter === 'server' 
                                ? 'bg-[#3D3D3D] text-white' 
                                : 'bg-[#D9D9D9] text-black'
                        }`}>
                            <p className="text-sm">{message.text || message.texto}</p>
                            <p className="text-xs mt-1 opacity-70">
                                {message.transmitter === 'server' ? 'Soporte' : message.username}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
                <form onSubmit={sendMessage} className="p-4 bg-white border-t flex justify-center sticky bottom-2">
                    <div className="sticky bottom-0 w-[90%] flex items-center">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Mandar mensaje a Soporte"
                            className="w-full  py-3 pl-4 pr-20 bg-[#D9D9D9] border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm text-blanco font-bold"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-3 top-0 bottom-0 flex items-center"
                        >
                           <svg width="20" height="20" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4199 34.7562C8.97454 33.1438 9.04436 26.8326 13.5243 25.319L75.9286 4.23395C79.8499 2.90904 83.591 6.65008 82.2661 10.5714L61.181 72.9757C59.6674 77.4556 53.3562 77.5255 51.7438 73.0801L42.3402 47.1552C41.8349 45.7622 40.7378 44.6651 39.3448 44.1598L13.4199 34.7562Z" stroke="black" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M80.4177 6.67969L41.543 44.9567" stroke="black" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </form>
        </div>
    );
};

export default Chat;