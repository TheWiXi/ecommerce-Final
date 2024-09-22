const express = require('express');
const productRoutes = require('../../application/routes/productRoute');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');

const createServer = () => {
    
    const app = express();

    app.use(express.json());

    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use('/products', productRoutes);
    return app;
};


module.exports = createServer;