const Coupon = require('../models/cuponModel')

class CouponRepository{
    
    async getCouponRepository(id) {
        try {
            const coupon = new Coupon();
            return await coupon.getAnSpecificCoupon(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving coupon'}));
        }
    }

async getAllCouponRepository(){
        try {
            const coupon = new Coupon();
            const query = [
                    {
                      $lookup: {
                        from: "usuario", 
                        localField: "usuarioId", 
                        foreignField: "_id", 
                        as: "usuario_info" 
                      }
                    },
                    {
                      $unwind: "$usuario_info" 
                    },
                    {
                      $project: {
                        _id: 1,
                        codigo: 1,
                        descuento: 1,
                        tipo: 1,
                        fechaExpiracion: 1,
                        imagen: 1,
                        nombreUsuario: "$usuario_info.nombre", 
                        correoUsuario: "$usuario_info.correo", 
                       
                      }
                    }
            ]
            return await coupon.getAllCoupons(query);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving coupons'}));
        }   
}


async saveCouponRepository(productData) {
    try {
        const coupon = new Coupon();
        return await coupon.insertCoupons(productData);
    } catch (error) {
        throw new Error(JSON.stringify({status: 500, message: 'Error saving coupon'}));
    }
}

async deleteCouponsById(id) {
    try {
        const coupon = new Coupon();
        return await coupon.deleteCoupons(id);
    } catch (error) {
        throw new Error(JSON.stringify({status: 404, message: 'Error deleting coupon'}));
    }
}


async updateCouponById(id, updateData) {
    try {
        const coupon = new Coupon();
        return await coupon.updateCoupons(id, updateData, { upsert: true });
    } catch (error) {
        console.error("MongoDB error:", error);  // Log the actual MongoDB error
        throw new Error(JSON.stringify({status: 500, message: 'Error updating coupon'}));
    }
}

}

module.exports = CouponRepository;