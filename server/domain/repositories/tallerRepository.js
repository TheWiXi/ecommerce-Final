const Taller = require('../models/tallerModel');

class TallerRepository {
    async getAllT() {
        try {
            const taller = new Taller();
            return await taller.getAllWorkShops();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving talleres'}));
        }
    }
}

module.exports = TallerRepository;

