const Taller = require("../../adapters/database/tallerSchema");

class Workshop{

    async getAllWorkshops(){
        return await Taller.find({}).exec();
    }



}

module.exports = Workshop;