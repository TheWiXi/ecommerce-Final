const Product = require('../models/productModel');

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


    async searchByName(name) {
        try {
            return await Product.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for products');
        }
    }
    async getProductGroupId(artesanoId) {
        try {
            return await Product.getProductsGroupedByArtesanoWithNames(artesanoId);
        } catch (error) {
            // Log the original error for debugging
            console.error('Database error:', error);
    
            // Throw a more informative error
            throw new Error(JSON.stringify({
                status: 500,
                message: `Error searching for product grouped by artesanoId: ${error.message}`
            }));
        }
    }

    async getProductNamesGroupByArtesanoId(artesanoId, searchTerm) {
        try {
            return await Product.getProductsGroupedByArtesanoWithNames(artesanoId, searchTerm);
        } catch (error) {
            console.error('Database error:', error);
            throw new Error(JSON.stringify({
                status: 500,
                message: `Error searching for name product grouped by artesanoId: ${error.message}`
            }));
        }
    }
    
    
}      

module.exports = productRepository;