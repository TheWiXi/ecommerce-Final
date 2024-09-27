const express = require('express');
const session = require('express-session');
const cors = require('cors');
const googleStrategy = require('../../application/middlewares/authenticateGoogle');
const gitHubStrategy = require('../../application/middlewares/authenticateGit');
const productRoutes = require('../../application/routes/productRoute');
const userRoutes = require('../../application/routes/userRoute');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const tallerRoute = require('../../application/routes/tallerRoute')

const createServer = () => {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:5173',
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
    return app;
};

module.exports = createServer;
