const Producto = require("../../adapters/database/productSchema");
const mongoose = require('mongoose');

class Product{
    async findById(id) {
        return await Producto.findById(id).exec(); 
    }

    async getAllproductos() {
        return await Producto.find({}).exec(); 
    }

    async insert(productData) {
        const producto = new Producto(productData);
        return await producto.save(); 
    }

    async findByIdAndUpdate(id, updateData) {
        return await Producto.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); 
    }

    async findByIdAndDelete(id) {
        return await Producto.findByIdAndDelete(id).exec();
    }


    static async getProductsGroupedByArtesanoWithNames(artesanoId, searchTerm) {
        return await Producto.aggregate([
            {
                $match: {
                    artesanoId: new mongoose.Types.ObjectId(artesanoId)
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
                $match: {
                    nombre: { $regex: searchTerm, $options: "i" } // Case insensitive search
                }
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
        ]);
    }






    
    async getAllproductsWithDescuento(query){
        return await Producto.aggregate(query).exec();
    }

}    





module.exports = Product;

      


