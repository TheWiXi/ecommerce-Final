const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const generateToken = require('../middlewares/token'); // Ajusta la ruta según sea necesario
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
            return res.redirect('http://localhost:5173/init-register'); 
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Maneja el error
            }
            const token = generateToken(user); // Asegúrate de que esta función está bien definida

            // Establecer el token en una cookie
            console.log("Generated Token:", token); // Agrega esta línea para depurar
            res.cookie('token', token, {maxAge: 30 * 60 * 1000 }); // 30 minutos
            
            return res.redirect('http://localhost:5173/home'); 
        });
    })(req, res, next);
});

router.post("/", userValidator.validateUserData(), (req, res) => userController.createUser(req, res))
router.post('/verifyEmail', userValidator.validateUserEmail(), (req, res) => userController.verifyUserForEmail(req, res))
router.post('/login', cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))
router.put('/:id', auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));

module.exports = router;