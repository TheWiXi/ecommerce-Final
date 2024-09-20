const {ObjectId}= require("mongodb");

const ConnectToDatabase = require("../../infrastructure/database/mongodb")

class Product{
    async getProductByName(productName) {
    let obj = ConnectToDatabase.instanceConnect;
    const collection = obj.db.collection('productos');
    //logica para obtener producto por el nombre
    return res;
    }

    async postProduct(data) {
      const obj = ConnectToDatabase.instanceConnect; 
      console.log('Product Data:', productData); // Depuración: Verifica la estructura
    
      const collection = obj.db.collection('productos');
      const res = await collection.insertOne(productData);
    
      return res;
    }
    

    async putProduct(id, updateData, upsert) {
      let obj = ConnectToDatabase.instanceConnect;
      const collection = obj.db.collection('productos');
      const res = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData },
          { upsert: upsert }
      );
      return res;
  }

  

  async deleteProduct(id) {
    let obj = ConnectToDatabase.instanceConnect;
    const collection = obj.db.collection('productos');
    const res = await collection.deleteOne({ _id: new ObjectId(id) }); // Usar deleteOne en lugar de deleteMany
    return res;
}
    }


module.exports = Product


      


