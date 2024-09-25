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


}

module.exports = CouponRepository;