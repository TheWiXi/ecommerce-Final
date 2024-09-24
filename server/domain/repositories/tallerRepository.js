const Workshop = require('../models/tallerModel');

class WorkshopRepository{

async getAllW(){
    try{
        const workshop = new Workshop();
        return await workshop.getAllWorkshops(); 
    } catch(error){
        throw new Error(JSON.stringify({status: 400,
            message: 'Error retrieving workshops'}));
    }
}

}

module.exports = WorkshopRepository;


