const {validationResult} = require("express-validator")
const WorkshopService = require("../services/tallerServices")

class WorkshopController{
    constructor(){
        this.workshopService = new WorkshopService()
    }

    async getWorksh(req,res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
            const product = await this.workshopService.getWorshops();
            res.status(200).json(workshop);
        }catch(error){
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({message: errorObj.message});
        }
    }
}

module.exports = WorkshopController


