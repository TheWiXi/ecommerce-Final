const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('../../application/middlewares/authenticateGoogle'); // Asegúrate de la ruta correcta
const productRoutes = require('../../application/routes/productRoute');
const userRoutes = require('../../application/routes/userRoute');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');

const createServer = () => {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true  
    }));

    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use(session({
        secret: 'tu_secreto_aqui', 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    app.use(passport.initialize()); // Inicializa Passport
    app.use(passport.session()); // Maneja la sesión

    app.use('/products', productRoutes);
    app.use('/users', userRoutes);

    return app;
};

module.exports = createServer;
