const TallerRepository = require('../../domain/repositories/tallerRepository');

class TallerService {
    constructor() {
        this.tallerRepository = new TallerRepository();
    }
    
    async getAllTalleres() {
        try {
            const talleres = await this.tallerRepository.getAllT();
            console.log('Talleres retrieved in service:', talleres);
            if (!talleres || talleres.length === 0) {
                throw new Error(JSON.stringify({status: 404, message: 'No talleres found'}));
            }
            return talleres;
        } catch (error) {
            console.error('Error in TallerService getAllTalleres:', error);
            throw error;
        }
    }
}

module.exports = TallerService;