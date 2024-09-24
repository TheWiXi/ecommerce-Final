const { validationResult } = require("express-validator");
const WorkshopService = require("../services/tallerServices");

class WorkshopController {
    constructor() {
        this.workshopService = new WorkshopService();
    }

    async getWorksh(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const workshops = await this.workshopService.getWorshops();
            res.status(200).json(workshops);
        } catch (error) {
            console.error("Error in getWorksh:", error);
            
            let statusCode = 500;
            let errorMessage = "An unexpected error occurred";

            try {
                const errorObj = JSON.parse(error.message);
                statusCode = errorObj.status || 500;
                errorMessage = errorObj.message || "An unexpected error occurred";
            } catch (parseError) {
                // If error.message is not valid JSON, use the original error message
                errorMessage = error.message || "An unexpected error occurred";
            }

            res.status(statusCode).json({ message: errorMessage });
        }
    }
}

module.exports = WorkshopController;

