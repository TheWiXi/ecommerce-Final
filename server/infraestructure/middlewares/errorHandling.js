exports.jsonParseErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Error de sintaxis JSON:', err.message);
        return res.status(400).json({
            message: 'Invalid JSON format. Please check the data and try again.'
        });
    }
    next();
}
