const { validationResult } = require("express-validator");
const WorkshopService = require("../services/tallerServices");

class WorkshopController {
    constructor() {
        this.workshopService = new WorkshopService();
    }

    async getAspecificWorkshop(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
            const workshop = await this.workshopService.getWorkshopId(req.params.id);
            res.status(200).json(workshop); // Cambié `product` a `workshop`
        } catch (error) {
            console.error('Error:', error.message);
            
            // Si el mensaje de error no es un JSON válido, maneja el error apropiadamente
            if (error.message.includes('some specific condition')) {
                return res.status(404).json({ message: 'Taller no encontrado' });
            }
            
            res.status(500).json({ message: 'Ocurrió un error inesperado' });
        }
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

async creatingAWorkshop(req,res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({
            errors: errors.array()
        });
        const workshops = await this.workshopService.creatingAworkshop(req.body);
        res.status(201).json(workshops);
    }catch (error){
        const errorObj = JSON.parse(error.message);
        res.status(errorObj.status).json({message: errorObj.message});
    }
}

}

module.exports = WorkshopController;

