const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infraestructure/database/mongodb");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.

class User{
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }

    async getAllusuarios() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.find({}).toArray();
        return res;
    }

    async insert(productData){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.insertMany([productData]);
        return res;
    }

    async findByIdAndUpdate(id, updateData, upsert){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }
    
}

module.exports = User;

      


