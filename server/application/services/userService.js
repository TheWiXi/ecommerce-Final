// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserRepository = require('../../domain/repositories/userRepository');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserById(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found'}));
        }
        return user;
    }

    async createUser(data) {
        return await this.userRepository.save(data);
    }

    async getUserByEmail(body){
        const [user] = await this.userRepository.getByEmail(body);
        if (!user) throw new Error(JSON.stringify({status: 404, message: 'User not found'}));
        return user
    }

    async getUserByEmailAndPassword(body) {
        const [user] = await this.userRepository.getByEmail(body);
        if (!user) throw new Error(JSON.stringify({status: 404, message: 'User not found'}));
        const token = await this.userRepository.getByPassword(body.contraseña, user);
        if (!token)  throw new Error(JSON.stringify({status: 404, message: 'wrong password'}));
        return token;
    }

    async updateUser(id, data) {
        const updatedUser = await this.userRepository.updateById(id, data);
        if (!updatedUser) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be updated'}));
        }
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await this.userRepository.deleteById(id);
        if (!deletedUser) {
            throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be deleted'}));
        }        
        return deletedUser;
    }
    
    async searchUsersByName(name) {
        return await this.userRepository.searchByName(name);
    }
}

module.exports = UserService;