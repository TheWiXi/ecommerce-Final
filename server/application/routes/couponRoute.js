const express = require('express');
const CouponController = require("../controllers/cuponController")
const CouponsValidator = require("../validator/couponValidator")

const router  = express.Router()
const couponController = new CouponController();
const couponsValidator  = new CouponsValidator();


router.get("/getAllCoupons",couponsValidator.validateCouponDataEmpty(), (req, res)=>couponController.getCouponsController(req, res))
router.get("/:id",couponsValidator.validateCouponId(), (req, res)=>couponController.getCouponController(req, res))
router.post("/postingCouponsData", couponsValidator.validateCouponData(), (req, res) => couponController.createCouponController(req, res))
router.delete('/:id', couponsValidator.validateCompoundtId(), (req, res) => couponController.deleteCouponController(req, res));
router.put('/:id' ,couponsValidator.validateCoupounUpdateDataByID(), (req, res) => couponController.updateCouponController(req, res));


module.exports = router;
