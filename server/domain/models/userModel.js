const user = require("../../adapters/database/userSchema");

class User{
    async findById(id) {
        return await user.findById(id).exec(); 
    }

    async getAllusers() {
        return await user.find({}).exec(); 
    }

    async insert(productData) {
        const user = new user(productData);
        return await user.save(); 
    }

    async findByIdAndUpdate(id, updateData) {
        return await user.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); 
    }

    async findByIdAndDelete(id) {
        return await user.findByIdAndDelete(id).exec();
    }
    
}

module.exports = User;

      


