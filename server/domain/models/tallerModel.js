// const {ObjectId} = require('mongodb')
const ConnectToDatabase = require('../../infraestructure/database/mongodb');

class Taller {

    async getAllWorkShops() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('taller'); 
        const res = await collection.find({}).toArray();
        return res;
    }
}


module.exports = Taller;