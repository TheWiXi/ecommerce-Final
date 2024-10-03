const Product = require('../models/productModel');
const {ObjectId} = require('mongodb')
class productRepository {
    async getById(id) {
        try {
            const product = new Product();
            return await product.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving product'}));
        }
    }

    async getAll() {
        try {
            const product = new Product();
            return await product.getAllproductos();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving products'}));
        }
    }

    async save(productData) {
        try {
            const product = new Product();
            return await product.insert(productData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving product'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const product = new Product();
            return await product.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating product'}));
        }
    }

    async deleteById(id) {
        try {
            const product = new Product();
            return await product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting product'}));
        }
    }

    async getByCategory(body) {
        try {
            const product = new Product();
            let {categoria} = body
            const query = [
                {
                    $match: { categoria: { $regex: new RegExp(categoria, 'i') } }
                },
                {
                    $lookup: {
                        from: 'usuario', // Nombre de la colección de usuarios
                        localField: 'artesanoId', // Campo en tu colección de productos que referencia al ID del artesano
                        foreignField: '_id', // Campo en la colección de usuarios que es el ID
                        as: 'artesano' // Nombre del nuevo campo que contendrá los datos del artesano
                    }
                },
                {
                    $unwind: {
                        path: '$artesano',
                        preserveNullAndEmptyArrays: true 
                    }
                },
                {
                    $project: {
                        _id: 1  , 
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
            const result = await product.aggregate(query);
            return result;
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving category'}));
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
            throw new Error(JSON.stringify({status: 400, message: 'Error query'}));
        }
    }    
}      

module.exports = productRepository;