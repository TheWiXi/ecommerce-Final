const CouponRepository = require("../../domain/repositories/cuponRepository")

class CouponService{
constructor(){
    this.CouponService = new CouponRepository()
}

async getAllCouponsService(){
    const coupon = await this.CouponService.getAllCouponRepository()
    if(!coupon){
        throw new Error(JSON.stringify({status:404, message:'Coupons not found'}));
    }
    return coupon
}


}
module.exports = CouponService


