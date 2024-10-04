const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken

/**
 * Middleware para autenticar usuarios usando cookies.
 * Verifica si el token de autenticación está presente en las cookies o en el encabezado.
 * Si el token es válido, permite continuar al siguiente middleware; si no, redirige al usuario.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.authCookie = (req, res, next) => {
    let authHeader = undefined; // Variable para almacenar el encabezado de autenticación

    // Comprueba si hay un encabezado de autorización en la solicitud
    if(req.headers.authorization) authHeader = req.headers.authorization;
    
    // Comprueba si hay un token en las cookies
    if(req.cookies.token) authHeader = req.cookies.token;
    
    // Extrae el token del encabezado o las cookies
    const token = authHeader && authHeader.split(' ')[1];
    
    // Si no hay token, redirige a la página de usuarios
    if (!token) return res.redirect("/users");
    
    // Verifica el token utilizando la clave secreta
    jwt.verify(token, process.env.KEY_SECRET, (err, payload) => {
        if (err) return res.redirect("/users"); // Si hay un error, redirige al usuario
        next(); // Si el token es válido, pasa al siguiente middleware
    });
}

/**
 * Middleware para autenticar usuarios usando sesiones.
 * Verifica si el token de autenticación está presente en el encabezado o en la sesión.
 * Si el token es válido, permite continuar al siguiente middleware; si no, redirige al usuario.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.auth = (req, res, next) => {
    let authHeader = undefined; // Variable para almacenar el encabezado de autenticación

    // Comprueba si hay un encabezado de autorización en la solicitud
    if(req.headers.authorization) authHeader = req.headers.authorization;
    
    // Comprueba si hay un token en la sesión
    if(req.session.token) authHeader = req.session.token;

    // Extrae el token del encabezado o la sesión
    const token = authHeader && authHeader.split(' ')[1];
    
    // Si no hay token, redirige a la página de usuarios
    if (!token) return res.redirect("/users");
    
    // Verifica el token utilizando la clave secreta
    jwt.verify(token, process.env.KEY_SECRET, (err, payload) => {
        if (err) return res.redirect("/users"); // Si hay un error, redirige al usuario
        // console.log(payload); // (Opcional) Imprime el payload del token en la consola
        next(); // Si el token es válido, pasa al siguiente middleware
    });
}
