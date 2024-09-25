const Cupon = require("../../adapters/database/cuponSchema");

class Coupon{


async getAnSpecificCoupon(id){
    return await Cupon.findById(id).exec();
    }

    
async getAllCoupons(){
    return await Cupon.find({}).exec();
}

async insertCoupons(productData) {
    const cupon = new Cupon(productData);
    return await cupon.save(); 
}

async deleteCoupons(id){
    return await Cupon.findByIdAndDelete(id).exec();
}
}

module.exports= Coupon;