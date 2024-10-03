const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
            return await user.getAllUsers();
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

    async updateUserCarritoById(id, updateData) {
        try {
            const user = new User();
            return await user.findByIdAndUpdateCarrito(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async updateUserFavoriteById(id, updateData) {
        try {
            const user = new User();
            return await user.findByIdAndUpdateFavorite(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async deleteUserCarritoById(id) {
        try {
            const user = new User();
            return await user.findByIdAndDeleteCarrito(id, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async deleteProductUserCarritoById(id, updateData) {
        try {
            const user = new User();
            return await user.findByIdAndDeleteProductCarrito(id, updateData, { upsert: true });
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
    
    async getByEmail(body) {
        try {
            const user = new User();
            let {correo} = body
            const query = [
                {
                    $match: { correo }
                }
            ];
            const result = await user.aggregate(query);
            return result;
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user for email'}));
        }
    }

    async getByPassword(password, user) {
        let {contraseña:pass} = user
        delete user.contraseña
        const isMatch = await bcrypt.compare(password , pass)
        if(!isMatch) throw new Error(JSON.stringify({status: 401, message: 'unauthorized'}));
        return jwt.sign(user, process.env.KEY_SECRET, { expiresIn: `${process.env.EXPRESS_EXPIRE}ms` })
    }
}

module.exports = userRepository;