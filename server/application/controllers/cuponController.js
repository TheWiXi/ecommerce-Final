const {validationResult} = require("express-validator")
const CouponService = require("../services/cuponServices")

class CouponController{
    constructor(){
        this.couponService = new CouponService()
    }

    async getCouponController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const coupons = await this.couponService.getCouponService(req.params.id);
            res.status(200).json(coupons);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async getCouponsController(req, res){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const coupons = await this.couponService.getAllCouponsService();
            res.status(200).json(coupons);
        }catch(error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }

    }
}

module.exports = CouponController


