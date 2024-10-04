// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserRepository = require('../../domain/repositories/userRepository');

/**
 * UserService - Service class to handle user-related operations.
 */
class UserService {
    constructor() {
        this.userRepository = new UserRepository(); // Initializing UserRepository instance
    }

    /**
     * Retrieves a user by their ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<Object>} - The user object.
     * @throws {Error} - If the user could not be found.
     */
    async getUserById(id) {
        const user = await this.userRepository.getById(id); // Fetching user from repository
        if (!user) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found' })); // Error if user not found
        }
        return user; // Returning the found user
    }

    /**
     * Retrieves all users.
     * @returns {Promise<Array>} - An array of user objects.
     * @throws {Error} - If users were not found.
     */
    async getAllUsersService() {
        const user = await this.userRepository.getAll(); // Fetching all users
        if (!user) {
            throw new Error(JSON.stringify({ status: 404, message: 'Users were not found' })); // Error if no users found
        }
        return user; // Returning the array of users
    }

    /**
     * Creates a new user.
     * @param {Object} data - The data of the user to create.
     * @returns {Promise<Object>} - The created user object.
     */
    async createUser(data) {
        return await this.userRepository.save(data); // Saving the new user
    }

    /**
     * Retrieves a user by email.
     * @param {Object} body - The request body containing email.
     * @returns {Promise<Object>} - The user object.
     * @throws {Error} - If the user could not be found.
     */
    async getUserByEmail(body) {
        const [user] = await this.userRepository.getByEmail(body); // Fetching user by email
        if (!user) throw new Error(JSON.stringify({ status: 404, message: 'User not found' })); // Error if user not found
        return user; // Returning the found user
    }

    /**
     * Retrieves a user by email and password.
     * @param {Object} body - The request body containing email and password.
     * @returns {Promise<string>} - A token if the user is found and the password matches.
     * @throws {Error} - If the user is not found or the password is incorrect.
     */
    async getUserByEmailAndPassword(body) {
        const [user] = await this.userRepository.getByEmail(body); // Fetching user by email
        if (!user) throw new Error(JSON.stringify({ status: 404, message: 'User not found' })); // Error if user not found
        const token = await this.userRepository.getByPassword(body.contraseña, user); // Validating password
        if (!token) throw new Error(JSON.stringify({ status: 404, message: 'wrong password' })); // Error if password is incorrect
        return token; // Returning the token
    }

    /**
     * Updates a user by their ID.
     * @param {string} id - The ID of the user to update.
     * @param {Object} data - The data to update the user with.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async updateUser(id, data) {
        const updatedUser = await this.userRepository.updateById(id, data); // Updating the user in the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if update fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Updates a user's cart by their ID.
     * @param {string} id - The ID of the user whose cart to update.
     * @param {Object} data - The new cart data.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async updateCarritoById(id, data) {
        const updatedUser = await this.userRepository.updateUserCarritoById(id, data); // Updating the user's cart in the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if update fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Updates a user's favorite items by their ID.
     * @param {string} id - The ID of the user whose favorites to update.
     * @param {Object} data - The new favorite data.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async updateFavoireteById(id, data) {
        const updatedUser = await this.userRepository.updateUserFavoriteById(id, data); // Updating the user's favorites in the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if update fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Deletes a user's cart by their ID.
     * @param {string} id - The ID of the user whose cart to delete.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async deleteCarritoById(id) {
        const updatedUser = await this.userRepository.deleteUserCarritoById(id); // Deleting the user's cart from the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if deletion fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Deletes a product from a user's cart by their ID.
     * @param {string} id - The ID of the user whose cart to update.
     * @param {Object} data - The product data to remove.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async deleteProductCarritoById(id, data) {
        const updatedUser = await this.userRepository.deleteProductUserCarritoById(id, data); // Deleting product from user's cart in the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if deletion fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Deletes a product from a user's favorites by their ID.
     * @param {string} id - The ID of the user whose favorites to update.
     * @param {Object} data - The product data to remove.
     * @returns {Promise<Object>} - The updated user object.
     * @throws {Error} - If the user is not found or could not be updated.
     */
    async deleteProductFavoriteById(id, data) {
        const updatedUser = await this.userRepository.deleteProductUserFavoriteById(id, data); // Deleting product from user's favorites in the repository
        if (!updatedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be updated' })); // Error if deletion fails
        }
        return updatedUser; // Returning the updated user
    }

    /**
     * Deletes a user by their ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<Object>} - The deleted user object.
     * @throws {Error} - If the user is not found or could not be deleted.
     */
    async deleteUser(id) {
        const deletedUser = await this.userRepository.deleteById(id); // Deleting the user from the repository
        if (!deletedUser) {
            throw new Error(JSON.stringify({ status: 404, message: 'User not found or could not be deleted' })); // Error if deletion fails
        }        
        return deletedUser; // Returning the deleted user
    }

    /**
     * Searches for users by their name.
     * @param {string} name - The name to search for.
     * @returns {Promise<Array>} - An array of user objects matching the name.
     */
    async searchUsersByName(name) {
        return await this.userRepository.searchByName(name); // Searching for users by name
    }
}

// Exporting the UserService class for use in other parts of the application
module.exports = UserService;
