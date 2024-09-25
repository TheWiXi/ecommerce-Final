const CouponRepository = require("../../domain/repositories/cuponRepository")

class CouponService{
constructor(){
    this.CouponService = new CouponRepository()
}

async getCouponService(id){
    const coupon = await this.CouponService.getCouponRepository(id)
    if(!coupon){
        throw new Error(JSON.stringify({status: 404, message: 'Coupon not found'}));
    }
    return coupon
}

async getAllCouponsService(){
    const coupon = await this.CouponService.getAllCouponRepository()
    if(!coupon){
        throw new Error(JSON.stringify({status:404, message:'Coupons not found'}));
    }
    return coupon
}

async createCouponService(data) {
    const coupon = await this.CouponService.saveCouponRepository(data);
    if(!coupon){
        throw new Error(JSON.stringify({status: 404, message: 'Error entering coupon'}));
    }
    return coupon
}



}
module.exports = CouponService


