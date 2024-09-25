const Cupon = require("../../adapters/database/cuponSchema");

class Coupon{

async getAllCoupons(){
    return await Cupon.find({}).exec();
}






}

module.exports= Coupon;