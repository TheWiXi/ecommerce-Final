// Importing necessary modules
const express = require('express'); // Importing the Express framework
const CouponController = require("../controllers/cuponController"); // Importing the CouponController
const CouponsValidator = require("../validator/couponValidator"); // Importing the CouponsValidator

// Creating an Express router instance
const router = express.Router();
const couponController = new CouponController(); // Instantiating the CouponController
const couponsValidator = new CouponsValidator(); // Instantiating the CouponsValidator

/**
 * @route GET /getAllCoupons
 * @group Coupons - Operations about coupons
 * @returns {Array} 200 - An array of coupons
 * @returns {Error}  500 - Internal server error
 */
router.get("/getAllCoupons", couponsValidator.validateCouponDataEmpty(), (req, res) => 
    couponController.getCouponsController(req, res) // Fetching all coupons
);

/**
 * @route GET /{id}
 * @group Coupons - Operations about coupons
 * @param {string} id.path.required - The id of the coupon
 * @returns {Object} 200 - The requested coupon
 * @returns {Error}  404 - Coupon not found
 */
router.get("/:id", couponsValidator.validateCouponId(), (req, res) => 
    couponController.getCouponController(req, res) // Fetching a coupon by ID
);

/**
 * @route POST /postingCouponsData
 * @group Coupons - Operations about coupons
 * @param {Coupon.model} coupon.body.required - Coupon data
 * @returns {Object} 201 - The created coupon
 * @returns {Error}  400 - Invalid coupon data
 */
router.post("/postingCouponsData", couponsValidator.validateCouponData(), (req, res) => 
    couponController.createCouponController(req, res) // Creating a new coupon
);

/**
 * @route DELETE /{id}
 * @group Coupons - Operations about coupons
 * @param {string} id.path.required - The id of the coupon to delete
 * @returns {Object} 204 - Coupon deleted successfully
 * @returns {Error}  404 - Coupon not found
 */
router.delete('/:id', couponsValidator.validateCompoundtId(), (req, res) => 
    couponController.deleteCouponController(req, res) // Deleting a coupon by ID
);

/**
 * @route PUT /{id}
 * @group Coupons - Operations about coupons
 * @param {string} id.path.required - The id of the coupon to update
 * @param {Coupon.model} coupon.body.required - Updated coupon data
 * @returns {Object} 200 - The updated coupon
 * @returns {Error}  400 - Invalid coupon update data
 */
router.put('/:id', couponsValidator.validateCoupounUpdateDataByID(), (req, res) => 
    couponController.updateCouponController(req, res) // Updating a coupon by ID
);

// Exporting the router for use in other parts of the application
module.exports = router;
