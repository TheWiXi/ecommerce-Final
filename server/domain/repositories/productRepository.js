const Product = require('../models/productModel');
const { ObjectId } = require('mongodb');

class productRepository {
    /**
     * Obtiene un producto específico por su ID.
     * @param {string} id - El ID del producto que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto encontrado.
     */
    async getById(id) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            return await product.findById(id); // 🟡 Llama al método para encontrar el producto por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el producto.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving product' }));
        }
    }

    /**
     * Obtiene todos los productos de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los productos.
     */
    async getAll() {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            return await product.getAllproductos(); // 🟡 Llama al método para obtener todos los productos.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los productos.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving products' }));
        }
    }

    /**
     * Guarda un nuevo producto en la base de datos.
     * @param {Object} productData - Los datos del producto que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto guardado.
     */
    async save(productData) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            return await product.insert(productData); // 🟡 Llama al método para insertar un nuevo producto.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al guardar el producto.
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving product' }));
        }
    }

    /**
     * Actualiza un producto por su ID.
     * @param {string} id - El ID del producto que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el producto.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el producto actualizado.
     */
    async updateById(id, updateData) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            return await product.findByIdAndUpdate(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el producto.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el producto.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating product' }));
        }
    }

    /**
     * Elimina un producto por su ID.
     * @param {string} id - El ID del producto que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el producto.
     */
    async deleteById(id) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            return await product.findByIdAndDelete(id); // 🟡 Llama al método para eliminar el producto por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el producto.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting product' }));
        }
    }

    /**
     * Obtiene productos por categoría.
     * @param {Object} body - Contiene la categoría para filtrar los productos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los productos encontrados en la categoría.
     */
    async getByCategory(body) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            let { categoria } = body; // 🟡 Extrae la categoría del objeto body.
            const query = [
                {
                    $match: { categoria: { $regex: new RegExp(categoria, 'i') } } // 🟡 Filtra productos por la categoría.
                },
                {
                    $lookup: {
                        from: 'usuario', // 🟡 Nombre de la colección de usuarios.
                        localField: 'artesanoId', // 🟡 Campo que referencia al ID del artesano en productos.
                        foreignField: '_id', // 🟡 Campo en la colección de usuarios que es el ID.
                        as: 'artesano' // 🟡 Nombre del nuevo campo que contendrá los datos del artesano.
                    }
                },
                {
                    $unwind: {
                        path: '$artesano', // 🟡 Descompone el array artesano para que se pueda acceder a sus campos.
                        preserveNullAndEmptyArrays: true 
                    }
                },
                {
                    $project: { // 🟡 Proyecta los campos deseados en el resultado final.
                        _id: 1, 
                        categoria: 1, 
                        nombreArtesano: '$artesano.nombre', 
                        correo: '$artesano.correo', 
                        fotoPerfil: '$artesano.fotoPerfil', 
                        direccion: '$artesano.direccion',
                        telefono: '$artesano.telefono',
                        nombre: 1, 
                        precio: 1, 
                        descripcion: 1,
                        foto: 1,
                        stock: 1,
                        descuento: 1,
                        dimensiones: 1
                    }
                }
            ];
            const result = await product.aggregate(query); // 🟡 Realiza la agregación para obtener los productos.
            return result; // 🟡 Devuelve el resultado de la agregación.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar la categoría.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving category' }));
        }
    }

    /**
     * Obtiene productos por categoría y que son favoritos.
     * @param {Object} body - Contiene la categoría y los favoritos para filtrar los productos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los productos favoritos encontrados en la categoría.
     */
    async getByCategoryAndFavorite(body) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            const { categoria, favoritos } = body; // 🟡 Extrae categoría y favoritos del objeto body.
            const favoriteIds = favoritos.map(fav => new ObjectId(fav)); // 🟡 Convierte los favoritos en ObjectId.
            const query = [
                {
                    $match: {
                        _id: { $in: favoriteIds }, // 🟡 Filtra por los IDs de los favoritos.
                        categoria: { $regex: new RegExp(categoria, 'i') } // 🟡 Filtra por la categoría.
                    }
                }
            ];
            const result = await product.aggregate(query); // 🟡 Realiza la agregación para obtener los productos.
            return result; // 🟡 Devuelve el resultado de la agregación.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar la categoría.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving category' }));
        }
    }

    /**
     * Obtiene productos en una categoría con descuentos.
     * @param {Object} body - Contiene la categoría para filtrar los productos con descuento.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los productos en la categoría con descuento.
     */
    async getByCategoryDiscounts(body) {
        try {
            const product = new Product(); // 🟡 Crea una nueva instancia del modelo Product.
            let { categoria } = body; // 🟡 Extrae la categoría del objeto body.

            const query = [
                {
                    $match: { 
                        categoria: { $regex: new RegExp(categoria, 'i') }, // 🟡 Filtra productos por la categoría.
                        descuento: { $gt: 0 } // 🟡 Asegura que solo se devuelvan productos con descuento mayor a 0.
                    }
                },
                {
                    $lookup: {
                        from: 'usuario', // 🟡 Nombre de la colección de usuarios.
                        localField: 'artesanoId', // 🟡 Campo que referencia al ID del artesano en productos.
                        foreignField: '_id', // 🟡 Campo en la colección de usuarios que es el ID.
                        as: 'artesano' // 🟡 Nombre del nuevo campo que contendrá los datos del artesano.
                    }
                },
                {
                    $unwind: {
                        path: '$artesano', // 🟡 Descompone el array artesano.
                        preserveNullAndEmptyArrays: true 
                    }
                },
                {
                    $project: { // 🟡 Proyecta los campos deseados en el resultado final.
                        _id: 1, 
                        categoria: 1, 
                        nombreArtesano: '$artesano.nombre', 
                        correo: '$artesano.correo', 
                        fotoPerfil: '$artesano.fotoPerfil', 
                        direccion: '$artesano.direccion',
                        telefono: '$artesano.telefono',
                        nombre: 1, 
                        precio: 1, 
                        descripcion: 1,
                        foto: 1,
                        stock: 1,
                        descuento: 1,
                        dimensiones: 1
                    }
                }
            ];
            const result = await product.aggregate(query); // 🟡 Realiza la agregación para obtener los productos con descuento.
            return result; // 🟡 Devuelve el resultado de la agregación.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar la categoría.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving category' }));
        }
    }
    
    async getProductNamesGroupByArtesanoId(artesanoId) {
        try {
            const product = new Product();
            const id = artesanoId
            const query = [
                {
                    $match: {
                        artesanoId: new ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "usuario",
                        localField: "artesanoId",
                        foreignField: "_id",
                        as: "usuarioInfo"
                    }
                },
                {
                    $unwind: "$usuarioInfo"
                },
                {
                    $group: {
                        _id: "$artesanoId",
                        artesanoNombre: { $first: "$usuarioInfo.nombre" },
                        fotoPerfil: { $first: "$usuarioInfo.fotoPerfil" },
                        productos: {
                            $push: {
                                nombre: "$nombre",
                                categoria: "$categoria",
                                descripcion: "$descripcion",
                                precio: "$precio",
                                dimensiones: "$dimensiones",
                                foto: "$foto",
                                stock: "$stock",
                                descuento: "$descuento"
                            }
                        }
                    }
                }
            ]
            const result = await product.aggregate(query);
            return result
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving category discounts' }));
        }
    }
}

module.exports = productRepository; // 🟡 Exporta la clase para su uso en otros módulos.
