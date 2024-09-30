import { io } from 'socket.io-client';

const socket = io(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}` || 'http://localhost:5000');

export default socket;
