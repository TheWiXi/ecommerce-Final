const {ObjectId} = require()
const ConnectToDatabase = require('../../infraestructure/database/mongodb');

class Taller{

    async getAllWorkShops(){
        let obj = ConnectToDatabase.getWorkshops.instanceConnect;
        const collection = onj.db.collection('taller');
        const [res] = await collection.find({}).toArray();
        return res;
    }

}

module.exports = Taller;