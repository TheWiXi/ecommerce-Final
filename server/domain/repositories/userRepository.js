const User = require('../models/userModel');

class userRepository {
    async getById(id) {
        try {
            const user = new User();
            return await user.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async getAll() {
        try {
            const user = new User();
            return await user.getAllusuarios();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving users'}));
        }
    }

    async save(userData) {
        try {
            const user = new User();
            return await user.insert(userData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving user'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const user = new User();
            return await user.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async deleteById(id) {
        try {
            const user = new User();
            return await user.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting user'}));
        }
    }

    async searchByName(name) {
        try {
            const user = new User();
            return await user.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for users');
        }
    }
}

module.exports = userRepository;