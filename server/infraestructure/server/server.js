const express = require('express');
const productRoutes = require('../../application/routes/productRoute');
const userRoutes = require('../../application/routes/userRoute');
const couponRoute = require('../../application/routes/couponRoute');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const tallerRoute = require('../../application/routes/tallerRoute')
const createServer = () => {
    
    const app = express();

    app.use(express.json());

    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/workshops',tallerRoute)
    app.use('/coupons', couponRoute)
    return app;
};


module.exports = createServer;