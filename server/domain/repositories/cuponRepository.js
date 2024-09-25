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
            return await coupon.getAllCoupons();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving coupons'}));
        }
    
}


}

module.exports = CouponRepository;