const Workshop = require('../models/tallerModel');

class WorkshopRepository{

    async getWorkshopById(id){
        try{
            const workshop = new Workshop();
            return await workshop.findWorkshopById(id)
        } catch (error){
            throw new Error(JSON.stringify({status:400,message:'Error retrieving a workshop '}));
        }
    };


async getAllW(){
    try{
        const workshop = new Workshop();
        return await workshop.getAllWorkshops(); 
    } catch(error){
        throw new Error(JSON.stringify({status: 400,
            message: 'Error retrieving workshops'}));
    }
};

async saveAWorkshop(workshopData) {
    try {
        const workshop = new Workshop();
        return await workshop.insertingNewWorkshop(workshopData);
    } catch (error) {
        console.error('Error details:', error); // Registrar detalles del error
        throw new Error(JSON.stringify({
            status: 500,
            message: 'Error saving workshop',
            originalError: error.message // Incluir el mensaje original del error
        }));
    }
}


}

module.exports = WorkshopRepository;


