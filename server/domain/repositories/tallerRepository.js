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
async deltingWorkshop(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Obtener el ID del taller de los parámetros
        const id = req.params.id;

        // Llamar al servicio para eliminar el taller
        const deletedWorkshop = await this.workshopService.deletingWorkshop(id);

        // Responder con un estado 204 si se eliminó correctamente
        res.status(204).json(deletedWorkshop);
    } catch (error) {
        const errorObj = JSON.parse(error.message);
        res.status(errorObj.status).json({ message: errorObj.message });
    }
}



}

module.exports = WorkshopRepository;


