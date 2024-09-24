const WorkshopRepository = require('../../domain/repositories/tallerRepository')
 const {ObjectId} = require ('mongodb')
class WorkshopService{
    constructor(){
        this.workshopService = new WorkshopRepository()
    }

async getWorkshopId(id){
    const workshop = await this.workshopService.getWorkshopById(id)
    if(!workshop){
        throw new Error(JSON.stringify({status: 404, message: 'Workshop could not be found'}));
    }
    return workshop
}

    async getWorshops(){
        const workshop = await this.workshopService.getAllW()
        if(!workshop){
            throw new Error(JSON.stringify({status: 404, message:'Workshop not found'}));
        }
        return workshop
    }

    async creatingAworkshop(data){
        const workshop = await this.workshopService.saveAWorkshop(data);
        if(!workshop){
            throw new Error(JSON.stringify({status: 404, message: 'Error entering workshop'}));
        }
        return workshop
    }

    async deletingWorkshop(id) {
        try {
            // Verificar si el ID es válido
            if (!ObjectId.isValid(id)) {
                throw new Error(JSON.stringify({ status: 400, message: 'Invalid workshop ID' }));
            }

            // Eliminar el taller
            const deletedWorkshop = await Workshop.findByIdAndDelete(id);
            
            if (!deletedWorkshop) {
                throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found or could not be deleted' }));
            }

            return deletedWorkshop; // Regresar el taller eliminado si es necesario
        } catch (error) {
            console.error('Error during deletion:', error);
            throw new Error(JSON.stringify({ status: 500, message: 'Error deleting workshop' }));
        }
    }

}

module.exports = WorkshopService

