const express = require('express');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');

const createServer = () => {
    
    const app = express();

    app.use(express.json());

    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    return app;
};


module.exports = createServer;