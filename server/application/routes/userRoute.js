const express = require('express');
const cookieParser = require('cookie-parser');

const UserController = require("../controllers/userController")
const UserValidator = require("../validator/userValidator")

const router  = express.Router()
const userController = new UserController();
const userValidator = new UserValidator();

router.get("/:id", userValidator.validateUserDataEmpty(), (req, res) => userController.getUser(req, res))
router.post("/", userValidator.validateUserData(), (req, res) => userController.createUser(req, res))
router.post('/login', cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))
router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));

module.exports = router;