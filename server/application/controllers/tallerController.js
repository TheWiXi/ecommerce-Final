const {validationResult} = require('express-validator')
const TallerService = require('../services/tallerServices')

class TallerController {
    constructor() {
        this.tallerService = new TallerService()
    }

    async getAllTalleres(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const talleres = await this.tallerService.getAllTalleres();
            res.status(200).json(talleres);
        } catch(error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = TallerController

