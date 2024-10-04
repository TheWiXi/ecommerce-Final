// Importing necessary modules
const express = require('express'); // Importing the Express framework
const WorkshopController = require('../controllers/tallerController'); // Importing the WorkshopController
const WorkshopValidator = require('../validator/tallerValidator'); // Importing the WorkshopValidator

// Creating an Express router instance
const router = express.Router();
const workshopController = new WorkshopController(); // Instantiating the WorkshopController
const workshopValidator = new WorkshopValidator(); // Instantiating the WorkshopValidator

/**
 * @route GET /getWorkshopWithArtesanoName
 * @group Workshops - Operations about workshops
 * @returns {Array} 200 - An array of workshops with artesano names
 * @returns {Error}  500 - Internal server error
 */
router.get('/getWorkshopWithArtesanoName', workshopValidator.getWAllWorkshopsWithTeacherNameControllerValidator(), (req, res) => 
    workshopController.getWAllWorkshopsWithTeacherNameController(req, res) // Fetching workshops with artesano names
);

/**
 * @route GET /{id}
 * @group Workshops - Operations about workshops
 * @param {string} id.path.required - The id of the workshop
 * @returns {Object} 200 - The requested workshop
 * @returns {Error}  404 - Workshop not found
 */
router.get('/:id', workshopValidator.validateAspecificWorkshopDataEmpty(), (req, res) => 
    workshopController.getAspecificWorkshop(req, res) // Fetching a specific workshop by ID
);

/**
 * @route GET /searchForArtesano/{id}
 * @group Workshops - Operations about workshops
 * @param {string} id.path.required - The id of the artesano
 * @returns {Array} 200 - An array of workshops for the specified artesano
 * @returns {Error}  404 - No workshops found for the artesano
 */
router.get('/searchForArtesano/:id', workshopValidator.validateAspecificWorkshopDataEmpty(), (req, res) => 
    workshopController.getWorkshoForIdUser(req, res) // Fetching workshops for a specific artesano by ID
);

/**
 * @route POST /postingAWorkshop
 * @group Workshops - Operations about workshops
 * @param {Workshop.model} workshop.body.required - Workshop data
 * @returns {Object} 201 - The created workshop
 * @returns {Error}  400 - Invalid workshop data
 */
router.post('/postingAWorkshop', workshopValidator.validatingWorkshopData(), (req, res) => 
    workshopController.creatingAWorkshop(req, res) // Creating a new workshop
);

/**
 * @route DELETE /{id}
 * @group Workshops - Operations about workshops
 * @param {string} id.path.required - The id of the workshop to delete
 * @returns {Object} 204 - Workshop deleted successfully
 * @returns {Error}  404 - Workshop not found
 */
router.delete('/:id', workshopValidator.workshopDeleter(), (req, res) => 
    workshopController.deleteWorkshop(req, res) // Deleting a workshop by ID
);

/**
 * @route PUT /{id}
 * @group Workshops - Operations about workshops
 * @param {string} id.path.required - The id of the workshop to update
 * @param {Workshop.model} workshop.body.required - Updated workshop data
 * @returns {Object} 200 - The updated workshop
 * @returns {Error}  400 - Invalid workshop update data
 */
router.put('/:id', workshopValidator.validateUpdateWorkshopsById(), (req, res) => 
    workshopController.updatingWorkshops(req, res) // Updating a workshop by ID
);

// Exporting the router for use in other parts of the application
module.exports = router;
