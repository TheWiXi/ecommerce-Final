import { io } from 'socket.io-client';

// Utilizando import.meta.env en lugar de process.env
const host = "localhost";
const port = 3000;

console.log(`http://${host}:${port}`);


const socket = io(`http://${host}:${port}`);

export default socket;
