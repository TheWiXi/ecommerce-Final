const Taller = require("../../adapters/database/tallerSchema");

class Workshop{

    async findWorkshopById(id){
        return await Taller.findById(id).exec();
    }

    async getAllWorkshops(){
        return await Taller.find({}).exec();
    }

    async insertingNewWorkshop(workshopData){
        const taller = new Taller(workshopData)
        return await taller.save();
    }

}

module.exports = Workshop;

