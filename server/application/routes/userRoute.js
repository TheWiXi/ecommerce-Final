const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const {auth} = require('../middlewares/authenticateToken')
const UserController = require("../controllers/userController")
const UserValidator = require("../validator/userValidator")

const router  = express.Router()
const userController = new UserController();
const userValidator = new UserValidator();


router.get("/:id", auth, userValidator.validateUserDataEmpty(), (req, res) => userController.getUser(req, res))
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err) {
            return next(err); // Maneja el error
        }
        if (!user) {
            return res.redirect('/init-register'); // Redirige si el usuario no está registrado
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Maneja el error
            }
            return res.redirect('/init-login'); // Redirige al login si el usuario está registrado
        });
    })(req, res, next);
});
router.post("/", userValidator.validateUserData(), (req, res) => userController.createUser(req, res))
router.post('/verifyEmail', userValidator.validateUserEmail(), (req, res) => userController.verifyUserForEmail(req, res))
router.post('/login', cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))
router.put('/:id', auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));

module.exports = router;