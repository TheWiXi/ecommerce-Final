const express = require('express');
const session = require('express-session');
const cors = require('cors');
const googleStrategy = require('../../application/middlewares/authenticateGoogle');
const gitHubStrategy = require('../../application/middlewares/authenticateGit');
const productRoutes = require('../../application/routes/productRoute');
const userRoutes = require('../../application/routes/userRoute');
const couponRoute = require('../../application/routes/couponRoute');
const messageRoute = require('../../application/routes/messageRoute')
const orderRoute = require('../../application/routes/orderRoute')
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const tallerRoute = require('../../application/routes/tallerRoute')
const cookieParser = require('cookie-parser')

const http = require('http');
const { Server } = require('socket.io');
const socketSetup = require('../socket/socketServer');
const chatRoutes = require('../../application/routes/chatRoute');


const createServer = () => {
    const app = express();

    const server = http.createServer(app);
    // Configurar Socket.IO
    const io = new Server(server, {
        cors: {
            origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Configurar Socket.io
    // require('../socket/socketServer')(io);
    socketSetup(io);

    // Configurar CORS
    app.use(cors({
        origin: ["http://127.0.0.1:5500", "http://localhost:5173"], // Añade aquí tus orígenes permitidos
        credentials: true
    }));

    app.use(express.json());
    app.use(cookieParser());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use(session({
        secret: 'tu_secreto_aqui', 
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false, 
            httpOnly: true, 
        }
    }));

    app.use(googleStrategy.initialize());
    app.use(googleStrategy.session());

    app.use(gitHubStrategy.initialize()); 
    app.use(gitHubStrategy.session());

    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/workshops',tallerRoute)

    app.use('/chat', chatRoutes);

    return server;
    app.use('/coupons', couponRoute)
    app.use('/messages',messageRoute)
    app.use('/orders', orderRoute);
    return app;
};

module.exports = createServer;
