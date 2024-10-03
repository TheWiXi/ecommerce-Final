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

    async deletingAWorkshop(id){
        return await Taller.findByIdAndDelete(id).exec();
    }

    async updatingWorkshops(id, updateData) {
        return await Taller.findByIdAndUpdate(id, updateData, { new: true }).exec();  // Use findByIdAndUpdate to update the document
    }

    async aggregate(query) {
      return await Taller.aggregate(query).exec();
  }
}


module.exports = Workshop;

