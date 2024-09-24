const WorkshopRepository = require('../../domain/repositories/tallerRepository')

class WorkshopService{
    constructor(){
        this.workshopService = new WorkshopRepository()
    }

    async getWorshops(){
        const workshop = await this.workshopService.getAllW()
        if(!workshop){
            throw new Error(JSON.stringify({status: 404, message:'Workshop not found'}));
        }
        return workshop
    }
}

module.exports = WorkshopService
