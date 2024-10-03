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

async getWhorkshopById(id){
    const product = await this.workshopService.getByIdArtesano(id)
    if(!product){
        throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
    }
    return product
}


    // async getWorshops(){
    //     const workshop = await this.workshopService.getAllW()
    //     if(!workshop){
    //         throw new Error(JSON.stringify({status: 404, message:'Workshop not found'}));
    //     }
    //     return workshop
    // }

    async creatingAworkshop(data){
        const workshop = await this.workshopService.saveAWorkshop(data);
        if(!workshop){
            throw new Error(JSON.stringify({status: 404, message: 'Error entering workshop'}));
        }
        return workshop
    }

    async workshopDeleted(id) {
        try {
            const deletedWorkshop = await this.workshopService.deltingWorkshop(id);
            
            if (!deletedWorkshop) {
                console.log(`No workshop found for id ${id}`);
                throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found or could not be deleted' }));
            }
    
            return deletedWorkshop;
        } catch (error) {
            console.error(`Error deleting workshop with id ${id}:`, error);
            throw error;
        }
    }

    async updateAWorkshop(id, data) {
        const updatedWorkshop = await this.workshopService.WorkshopUpdated(id, data);
        if (!updatedWorkshop) {
            throw new Error(JSON.stringify({ status: 404, message: 'Workshop not found or could not be updated' }));
        }
        return { message: 'Workshop updated successfully', updatedWorkshop };  // Return a success message
    }



    async getWAllWorkshopsWithTeacherNameService(){
        const workshop = await this.workshopService.getWAllWorkshopsWithTeacherNameRepository()
        if(!workshop){
            throw new Error(JSON.stringify({status: 404, message: 'workshop not found'}));
    }
    return workshop
  }
  
}

module.exports = WorkshopService

