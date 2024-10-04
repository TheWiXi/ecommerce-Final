const { validationResult } = require('express-validator'); // Importa la función de validación de express-validator
const cookieParser = require('cookie-parser'); // Importa el middleware para el análisis de cookies
const bcrypt = require('bcryptjs'); // Importa bcrypt para el hashing de contraseñas
const UserService = require('../services/userService'); // Importa el servicio de usuario

/**
 * UserController class that handles user-related operations.
 */
class UserController {
    constructor() {
        this.userService = new UserService(); // Crea una instancia del servicio de usuario
    }

    /**
     * Get a user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.getUserById(req.params.id); // Obtiene el usuario por ID
            res.status(200).json(user); // Devuelve el usuario encontrado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Get all users.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getAllUsersController(req, res){
        try{
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user  = await this.userService.getAllUsersService(); // Obtiene todos los usuarios
            res.status(200).json(user); // Devuelve la lista de usuarios
        }catch(error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Create a new user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            }
            if (req.body.contraseña) {
                const hashedPassword = await bcrypt.hash(req.body.contraseña, 10); // Hash de la contraseña
                req.body.contraseña = hashedPassword;  // Asigna la contraseña hasheada al cuerpo de la solicitud
            }
            const user = await this.userService.createUser(req.body); // Crea un nuevo usuario
            res.status(201).json(user); // Devuelve el usuario creado
        } catch (error) {
            const errorObj = error.message ? JSON.parse(error.message) : { status: 500, message: "Internal Server Error" }; // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }
    
    /**
     * Verify user credentials and log them in.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async verifyUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const token = await this.userService.getUserByEmailAndPassword(req.body); // Obtiene el token del usuario
            req.session.token = `Bearer ${token}`; // Almacena el token en la sesión
            res.status(200).json({message: "logeado..."}); // Devuelve mensaje de éxito
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Verify user by email.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async verifyUserForEmail(req, res){
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.getUserByEmail(req.body); // Obtiene el usuario por email
            res.json(user); // Devuelve el usuario encontrado
        } catch (error){
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Update user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.updateUser(req.params.id, req.body); // Actualiza el usuario
            res.status(200).json(user); // Devuelve el usuario actualizado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Update user's shopping cart by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateCarritoUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.updateCarritoById(req.params.id, req.body); // Actualiza el carrito del usuario
            res.status(200).json(user); // Devuelve el carrito actualizado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Update user's favorite products by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateFavoireteUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.updateFavoireteById(req.params.id, req.body); // Actualiza los favoritos del usuario
            res.status(200).json(user); // Devuelve los favoritos actualizados
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Delete user's shopping cart by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteCarritoUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.deleteCarritoById(req.params.id); // Elimina el carrito del usuario
            res.status(200).json(user); // Devuelve el carrito eliminado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }
    
    /**
     * Delete a product from user's shopping cart by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteProductCarritoUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.deleteProductCarritoById(req.params.id, req.body); // Elimina un producto del carrito del usuario
            res.status(200).json(user); // Devuelve el carrito actualizado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Delete a user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.deleteUser(req.params.id); // Elimina el usuario
            res.status(204).json(); // Devuelve estado 204 No Content
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

        /**
     * Delete a product from a user's favorites by user ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteProductFavoriteUser(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const user = await this.userService.deleteProductFavoriteById(req.params.id, req.body); // Elimina un producto de los favoritos del usuario
            res.status(200).json(user); // Devuelve la respuesta con el usuario actualizado
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        }
    }

    /**
     * Search for users by name.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async searchUsers(req, res) {
        try {
            const users = await this.userService.searchUsersByName(req.query.name); // Busca usuarios por nombre
            res.json(users); // Devuelve la lista de usuarios encontrados
        } catch (error) {
            res.status(500).json({ message: error.message }); // Devuelve un error interno si ocurre
        }
    }

    /**
     * Verify user credentials and set a cookie with the token.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async verifyUserCookies(req, res) {
        try {
            const errors = validationResult(req); // Verifica si hay errores de validación
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Devuelve errores si los hay
            const token = await this.userService.getUserByEmailAndPassword(req.body); // Obtiene el token del usuario
            res.cookie("token", `Bearer ${token}`, { // Establece la cookie con el token
                maxAge: process.env.EXPRESS_EXPIRE, // Establece la duración de la cookie
                httpOnly: true, // Configura la cookie como httpOnly
            })
            .status(201) // Establece el estado de la respuesta
            .json({ token }); // Devuelve el token en la respuesta
        } catch (error) {
            const errorObj = JSON.parse(error.message); // Procesa el error
            res.status(errorObj.status).json({ message: errorObj.message }); // Devuelve el error
        } 
    }

}

module.exports = UserController; // Exporta la clase UserController
