const Taller = require("../../adapters/database/tallerSchema");

class Workshop{

    async findWorkshopById(id){
        return await Taller.findById(id).exec();
    }


    async getAllWorkshops(){
        return await Taller.find({}).exec();
    }


}

module.exports = Workshop;
