const express = require('express');
const CouponController = require("../controllers/cuponController")
const CouponsValidator = require("../validator/couponValidator")

const router  = express.Router()
const couponController = new CouponController();
const couponsValidator  = new CouponsValidator();


router.get("/getAllCoupons",couponsValidator.validateCouponDataEmpty(), (req, res)=>couponController.getCouponsController(req, res))
router.get("/:id",couponsValidator.validateCouponId(), (req, res)=>couponController.getCouponController(req, res))


module.exports = router;