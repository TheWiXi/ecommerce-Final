const TallerRepository = require('../../domain/repositories/tallerRepository')

class TallerService {
    constructor(){
        this.tallerService = new TallerRepository()
    }

    async getAllTalleres(){
        const talleres = await this.tallerService.getAllT()
        if(!talleres){
            throw new Error(JSON.stringify({status: 404, message: 'Talleres not found'}));
        }
        return talleres
    }

}

module.exports = TallerService