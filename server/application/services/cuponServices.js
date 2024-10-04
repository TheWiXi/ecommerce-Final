// Importing the CouponRepository to handle coupon data operations
const CouponRepository = require("../../domain/repositories/cuponRepository");

/**
 * CouponService - Service class to handle coupon-related operations.
 */
class CouponService {
    constructor() {
        this.CouponService = new CouponRepository(); // Initializing CouponRepository instance
    }

    /**
     * Retrieves a coupon by its ID.
     * @param {string} id - The ID of the coupon to retrieve.
     * @returns {Promise<Object>} - The coupon object.
     * @throws {Error} - If the coupon is not found.
     */
    async getCouponService(id) {
        const coupon = await this.CouponService.getCouponRepository(id); // Fetching coupon from repository
        if (!coupon) {
            throw new Error(JSON.stringify({ status: 404, message: 'Coupon not found' })); // Error if coupon not found
        }
        return coupon; // Returning the found coupon
    }

    /**
     * Retrieves all coupons.
     * @returns {Promise<Array>} - An array of coupon objects.
     * @throws {Error} - If no coupons are found.
     */
    async getAllCouponsService() {
        const coupon = await this.CouponService.getAllCouponRepository(); // Fetching all coupons from repository
        if (!coupon) {
            throw new Error(JSON.stringify({ status: 404, message: 'Coupons not found' })); // Error if no coupons found
        }
        return coupon; // Returning the array of coupons
    }

    /**
     * Creates a new coupon.
     * @param {Object} data - The data of the coupon to create.
     * @returns {Promise<Object>} - The created coupon object.
     * @throws {Error} - If there is an error entering the coupon.
     */
    async createCouponService(data) {
        const coupon = await this.CouponService.saveCouponRepository(data); // Saving the new coupon
        if (!coupon) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error entering coupon' })); // Error if coupon creation fails
        }
        return coupon; // Returning the created coupon
    }

    /**
     * Deletes a coupon by its ID.
     * @param {string} id - The ID of the coupon to delete.
     * @returns {Promise<Object>} - The deleted coupon object.
     * @throws {Error} - If the coupon is not found or could not be deleted.
     */
    async deleteCouponService(id) {
        const deletedCoupon = await this.CouponService.deleteCouponsById(id); // Deleting the coupon from the repository
        if (!deletedCoupon) {
            throw new Error(JSON.stringify({ status: 404, message: 'Coupon not found or could not be deleted' })); // Error if coupon deletion fails
        }
        return deletedCoupon; // Returning the deleted coupon
    }

    /**
     * Updates a coupon by its ID.
     * @param {string} id - The ID of the coupon to update.
     * @param {Object} data - The data to update the coupon with.
     * @returns {Promise<Object>} - The updated coupon object.
     * @throws {Error} - If the coupon is not found or could not be updated.
     */
    async updateCouponService(id, data) {
        console.log("Updating coupon with ID:", id); // Logging the ID of the coupon being updated
        console.log("Data to update:", data); // Logging the data being used to update the coupon

        const updatedCoupon = await this.CouponService.updateCouponById(id, data); // Updating the coupon in the repository
        if (!updatedCoupon) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be updated' })); // Error if coupon update fails
        }
        return updatedCoupon; // Returning the updated coupon
    }
}

// Exporting the CouponService class for use in other parts of the application
module.exports = CouponService;
