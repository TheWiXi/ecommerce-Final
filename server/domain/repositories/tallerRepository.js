const Workshop = require('../models/tallerModel');
const {ObjectId} = require('mongodb')
class WorkshopRepository{

    async getWorkshopById(id){
        try{
            const workshop = new Workshop();
            return await workshop.findWorkshopById(id)
        } catch (error){
            throw new Error(JSON.stringify({status:400,message:'Error retrieving a workshop '}));
        }
    };


// async getAllW(){
//     try{
//         const workshop = new Workshop();
//         return await workshop.getAllWorkshops(); 
//     } catch(error){
//         throw new Error(JSON.stringify({status: 400,
//             message: 'Error retrieving workshops'}));
//     }
// };

async saveAWorkshop(workshopData) {
    try {
        const workshop = new Workshop();
        return await workshop.insertingNewWorkshop(workshopData);
    } catch (error) {
        console.error('Error details:', error); // Registrar detalles del error
        throw new Error(JSON.stringify({
            status: 500,
            message: 'Error saving workshop',
            originalError: error.message // Incluir el mensaje original del error
        }));
    }
    
}
async deltingWorkshop(id) {
    try{
        const workshop = new Workshop();
        return await workshop.deletingAWorkshop(id);
    } catch(error){
        throw new Error(JSON.stringify({status: 404, message: 'Error deleting workshop'}));
    }
}

async WorkshopUpdated(id, updateData){
    try{
        const workshop = new Workshop();
        return await workshop.updatingWorkshops(id, updateData);
    } catch (error){
        throw new Error(JSON.stringify({status: 500, message:'Error upsating workshops'}));
    }
}


async getByIdArtesano(artesanoId) {
    try {
        const workshop = new Workshop();
        const id = artesanoId
        const query = [
            {
                $match: {
                    artesanoId: new ObjectId(id)
                }
            }
        ]
        const result = await workshop.aggregate(query);
        return result
    } catch (error) {
        throw new Error(JSON.stringify({status: 400, message: 'Error query'}));
    }
}   

async getWAllWorkshopsWithTeacherNameRepository(){
    try {
        const workshop = new Workshop();
        const query = [
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
          ]
        return await workshop.aggregate(query);
    } catch (error) {
        throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Wokshops with teachers names'}));
    }
}


}


module.exports = WorkshopRepository;


