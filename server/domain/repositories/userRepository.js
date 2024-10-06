const User = require('../models/userModel'); // 🟡 Importa el modelo de User.
const bcrypt = require('bcryptjs'); // 🟡 Importa bcrypt para el manejo de contraseñas.
const jwt = require('jsonwebtoken'); // 🟡 Importa jsonwebtoken para la creación de tokens.

class userRepository {
    /**
     * Obtiene un usuario específico por su ID.
     * @param {string} id - El ID del usuario que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario encontrado.
     */
    async getById(id) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findById(id); // 🟡 Llama al método para encontrar el usuario por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el usuario.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving user' }));
        }
    }

    /**
     * Obtiene todos los usuarios.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los usuarios.
     */
    async getAll() {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.getAllUsers(); // 🟡 Llama al método para obtener todos los usuarios.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los usuarios.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving users' }));
        }
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     * @param {Object} userData - Los datos del usuario que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario guardado.
     */
    async save(userData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.insert(userData); // 🟡 Llama al método para insertar un nuevo usuario.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al guardar el usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving user' }));
        }
    }

    /**
     * Actualiza un usuario específico por su ID.
     * @param {string} id - El ID del usuario que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el usuario.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async updateById(id, updateData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndUpdate(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el usuario.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Actualiza el carrito de un usuario específico por su ID.
     * @param {string} id - El ID del usuario cuyo carrito se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el carrito.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async updateUserCarritoById(id, updateData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndUpdateCarrito(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el carrito.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el carrito del usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Actualiza los favoritos de un usuario específico por su ID.
     * @param {string} id - El ID del usuario cuyos favoritos se desean actualizar.
     * @param {Object} updateData - Los datos a actualizar en los favoritos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async updateUserFavoriteById(id, updateData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndUpdateFavorite(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar los favoritos.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar los favoritos del usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Elimina el carrito de un usuario específico por su ID.
     * @param {string} id - El ID del usuario cuyo carrito se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el carrito del usuario.
     */
    async deleteUserCarritoById(id) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndDeleteCarrito(id, { upsert: true }); // 🟡 Llama al método para eliminar el carrito del usuario.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el carrito del usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Elimina un producto del carrito de un usuario específico por su ID.
     * @param {string} id - El ID del usuario del cual se desea eliminar el producto del carrito.
     * @param {Object} updateData - Los datos del producto a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el producto del carrito.
     */
    async deleteProductUserCarritoById(id, updateData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndDeleteProductCarrito(id, updateData, { upsert: true }); // 🟡 Llama al método para eliminar el producto del carrito.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el producto del carrito del usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Elimina un producto de los favoritos de un usuario específico por su ID.
     * @param {string} id - El ID del usuario del cual se desea eliminar el producto de favoritos.
     * @param {Object} updateData - Los datos del producto a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el producto de favoritos.
     */
    async deleteProductUserFavoriteById(id, updateData) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndDeleteProductFavorite(id, updateData, { upsert: true }); // 🟡 Llama al método para eliminar el producto de favoritos.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el producto de favoritos del usuario.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

    /**
     * Elimina un usuario específico por su ID.
     * @param {string} id - El ID del usuario que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el usuario.
     */
    async deleteById(id) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.findByIdAndDelete(id); // 🟡 Llama al método para eliminar el usuario por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el usuario.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting user' }));
        }
    }

    /**
     * Busca usuarios por su nombre.
     * @param {string} name - El nombre a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los usuarios encontrados.
     */
    async searchByName(name) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            return await user.find({ name: new RegExp(name, 'i') }); // 🟡 Busca usuarios cuyo nombre coincida con la expresión regular.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al buscar usuarios.
            throw new Error('Error searching for users');
        }
    }

    /**
     * Obtiene un usuario por su correo electrónico.
     * @param {Object} body - El objeto que contiene el correo electrónico a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario encontrado.
     */
    async getByEmail(body) {
        try {
            const user = new User(); // 🟡 Crea una nueva instancia del modelo User.
            let { correo } = body; // 🟡 Extrae el correo del objeto body.
            const query = [
                {
                    $match: { correo } // 🟡 Crea una consulta para encontrar el usuario por correo.
                }
            ];
            const result = await user.aggregate(query); // 🟡 Ejecuta la consulta de agregación.
            return result; // 🟡 Devuelve el resultado de la consulta.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el usuario por correo.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving user for email' }));
        }
    }

    /**
     * Verifica si la contraseña coincide con la del usuario.
     * @param {string} password - La contraseña proporcionada para verificar.
     * @param {Object} user - El objeto del usuario que contiene la contraseña.
     * @returns {Promise} - Devuelve un token JWT si la contraseña es correcta.
     */
    async getByPassword(password, user) {
        let { contraseña: pass } = user; // 🟡 Extrae la contraseña del usuario.
        delete user.contraseña; // 🟡 Elimina la contraseña del objeto del usuario.
        const isMatch = await bcrypt.compare(password, pass); // 🟡 Compara la contraseña proporcionada con la almacenada.
        if (!isMatch) throw new Error(JSON.stringify({ status: 401, message: 'unauthorized' })); // 🟡 Lanza un error si la contraseña no coincide.
        return jwt.sign(user, process.env.KEY_SECRET, { expiresIn: `${process.env.EXPRESS_EXPIRE}ms` }); // 🟡 Devuelve un token JWT firmado.
    }



    async searchBarProductsAndUsersRepository(searchTerm) {
        try {
            const query = [
                {
                    $match: {
                        nombre: { $regex: searchTerm, $options: "i" },
                        tipo: "artesano"
                    }
                },
                {
                    $project: {
                        type: { $literal: "usuario" },
                        _id: 1,
                        nombre: 1,
                        correo: 1,
                        fotoPerfil: 1,
                        direccion: 1,
                        telefono: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                },
                {
                    $unionWith: {
                        coll: "producto",
                        pipeline: [
                            {
                                $match: {
                                    nombre: { $regex: searchTerm, $options: "i" }
                                }
                            },
                            {
                                $project: {
                                    type: { $literal: "producto" },
                                    _id: 1,
                                    nombre: 1,
                                    categoria: 1,
                                    descripcion: 1,
                                    precio: 1,
                                    dimensiones: 1,
                                    foto: 1,
                                    stock: 1,
                                    descuento: 1,
                                    artesanoId: 1
                                }
                            }
                        ]
                    }
                }
            ];

            const user = new User();
            const result = await user.searchBarProductsAndUsersModel(query);
            return result;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving products and users' }));
        }
    }
    
}

module.exports = userRepository; // 🟡 Exporta la clase userRepository.
