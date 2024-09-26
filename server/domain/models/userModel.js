const user = require("../../adapters/database/userSchema");

class User{
    async findById(id) {
        return await user.findById(id).exec(); 
    }

    async getAllusers() {
        return await user.find({}).exec(); 
    }

    async insert(productData) {
        const usercreate = new user(productData);
        return await usercreate.save(); 
    }

    async findByIdAndUpdate(id, updateData) {
        return await user.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); 
    }

    async findByIdAndDelete(id) {
        return await user.findByIdAndDelete(id).exec();
    }
    
    async aggregate(query) {
        return await user.aggregate(query).exec();
    }
}

module.exports = User;

      


