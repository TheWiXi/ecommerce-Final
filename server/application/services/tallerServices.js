// Importing the WorkshopRepository to handle workshop data operations
const WorkshopRepository = require('../../domain/repositories/tallerRepository');
const { ObjectId } = require('mongodb'); // Importing ObjectId from MongoDB

/**
 * WorkshopService - Service class to handle workshop-related operations.
 */
class WorkshopService {
    constructor() {
        this.workshopService = new WorkshopRepository(); // Initializing WorkshopRepository instance
    }

    /**
     * Retrieves a workshop by its ID.
     * @param {string} id - The ID of the workshop to retrieve.
     * @returns {Promise<Object>} - The workshop object.
     * @throws {Error} - If the workshop could not be found.
     */
    async getWorkshopId(id) {
        const workshop = await this.workshopService.getWorkshopById(id); // Fetching workshop from repository
        if (!workshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'Workshop could not be found' })); // Error if workshop not found
        }
        return workshop; // Returning the found workshop
    }

    /**
     * Retrieves a workshop by artesano ID.
     * @param {string} id - The ID of the artesano whose workshop to retrieve.
     * @returns {Promise<Object>} - The product object.
     * @throws {Error} - If the product is not found.
     */
    async getWhorkshopById(id) {
        const product = await this.workshopService.getByIdArtesano(id); // Fetching workshop by artesano ID
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if product not found
        }
        return product; // Returning the found product
    }

    // The following method is commented out. It can be uncommented and used if needed.
    /*
    async getWorshops() {
        const workshop = await this.workshopService.getAllW(); // Fetching all workshops
        if (!workshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found' })); // Error if no workshops found
        }
        return workshop; // Returning the array of workshops
    }
    */

    /**
     * Creates a new workshop.
     * @param {Object} data - The data of the workshop to create.
     * @returns {Promise<Object>} - The created workshop object.
     * @throws {Error} - If there is an error entering the workshop.
     */
    async creatingAworkshop(data) {
        const workshop = await this.workshopService.saveAWorkshop(data); // Saving the new workshop
        if (!workshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error entering workshop' })); // Error if workshop creation fails
        }
        return workshop; // Returning the created workshop
    }

    /**
     * Deletes a workshop by its ID.
     * @param {string} id - The ID of the workshop to delete.
     * @returns {Promise<Object>} - The deleted workshop object.
     * @throws {Error} - If the workshop is not found or could not be deleted.
     */
    async workshopDeleted(id) {
        try {
            const deletedWorkshop = await this.workshopService.deltingWorkshop(id); // Deleting the workshop from the repository
            
            if (!deletedWorkshop) {
                console.log(`No workshop found for id ${id}`); // Logging if no workshop is found
                throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found or could not be deleted' })); // Error if deletion fails
            }
    
            return deletedWorkshop; // Returning the deleted workshop
        } catch (error) {
            console.error(`Error deleting workshop with id ${id}:`, error); // Logging any errors during deletion
            throw error; // Throwing the caught error
        }
    }

    /**
     * Updates a workshop by its ID.
     * @param {string} id - The ID of the workshop to update.
     * @param {Object} data - The data to update the workshop with.
     * @returns {Promise<Object>} - A message indicating success and the updated workshop object.
     * @throws {Error} - If the workshop is not found or could not be updated.
     */
    async updateAWorkshop(id, data) {
        const updatedWorkshop = await this.workshopService.WorkshopUpdated(id, data); // Updating the workshop in the repository
        if (!updatedWorkshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found or could not be updated' })); // Error if update fails
        }
        return { message: 'Workshop updated successfully', updatedWorkshop }; // Returning a success message and updated workshop
    }

    /**
     * Retrieves all workshops with teacher names.
     * @returns {Promise<Array>} - An array of workshops with teacher names.
     * @throws {Error} - If workshops are not found.
     */
    async getWAllWorkshopsWithTeacherNameService() {
        const workshop = await this.workshopService.getWAllWorkshopsWithTeacherNameRepository(); // Fetching all workshops with teacher names
        if (!workshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'workshop not found' })); // Error if no workshops found
        }
        return workshop; // Returning the workshops with teacher names
    }
}

// Exporting the WorkshopService class for use in other parts of the application
module.exports = WorkshopService;
