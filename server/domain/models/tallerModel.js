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

   async getWAllWorkshopsWithTeacherNameModel(){
        return await Taller.aggregate([
            {
              $lookup: {
                from: "usuario",
                localField: "artesanoId",
                foreignField: "_id",
                as: "artesanoInfo"
              }
            },
            {
              $unwind: "$artesanoInfo"
            },
            {
              $project: {
                nombre: 1,
                descripcion: 1,
                modalidad: 1,
                fechaInicio: 1,
                duracion: 1,
                materialesProporcionados: 1,
                materialesRequeridos: 1,
                documental: 1,
                imagen: 1,
                "artesanoNombre": "$artesanoInfo.nombre",
                publico: 1
              }
            }
          ])
    }   
}


module.exports = Workshop;

