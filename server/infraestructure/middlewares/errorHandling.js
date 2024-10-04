// 🟡 Exporta un manejador de errores para errores de análisis de JSON.
exports.jsonParseErrorHandler = (err, req, res, next) => {
    // 🟡 Verifica si el error es una instancia de SyntaxError, el estado es 400 y el error tiene un cuerpo.
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Error de sintaxis JSON:', err.message); // 🟡 Registra el mensaje de error en la consola.
        // 🟡 Envía una respuesta con el estado 400 y un mensaje de error en formato JSON.
        return res.status(400).json({
            message: 'Invalid JSON format. Please check the data and try again.' // 🟡 Mensaje de error para el cliente.
        });
    }
    next(); // 🟡 Llama al siguiente middleware si no se detecta un error de análisis de JSON.
}
