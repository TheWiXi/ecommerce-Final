const Cupon = require("../../adapters/database/cuponSchema");

class Coupon{


async getAnSpecificCoupon(id){
    return await Cupon.findById(id).exec();
    }

    
async getAllCoupons(){
    return await Cupon.find({}).exec();
}



}

module.exports= Coupon;