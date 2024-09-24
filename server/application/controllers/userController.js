const { validationResult } = require('express-validator');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (req.body.contraseña) {
                const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);
                req.body.contraseña = hashedPassword; 
            }
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorObj = error.message ? JSON.parse(error.message) : { status: 500, message: "Internal Server Error" };
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    

    async verifyUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const token = await this.userService.getUserByEmailAndPassword(req.body);
            req.session.token = `Bearer ${token}`
            res.status(200).json({message: "logeado..."});
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.deleteUser(req.params.id);
            res.status(204).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchUsers(req, res) {
        try {
            const users = await this.userService.searchUsersByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async verifyUserCookies(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const token = await this.userService.getUserByEmailAndPassword(req.body);
            res.cookie("token", `Bearer ${token}`, {maxAge: process.env.EXPRESS_EXPIRE}).status(201).json({token});
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        } 
    }
}

module.exports = UserController;