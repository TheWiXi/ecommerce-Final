const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const generateToken = require('../middlewares/token'); 
const {auth} = require('../middlewares/authenticateToken')
const UserController = require("../controllers/userController")
const UserValidator = require("../validator/userValidator")

const router  = express.Router()
const userController = new UserController();
const userValidator = new UserValidator();


router.get("/getAllUsersTypeArtesano", userValidator.validateUserDataEmpty(), (req, res) => userController.getAllUsersController(req, res))
router.get("/:id", userValidator.validateUserDataEmpty(), (req, res) => userController.getUser(req, res))

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('http://localhost:5173/init-register'); 
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err); 
            }
            const token = generateToken(user); 
            res.cookie('token', token, {maxAge: 30 * 60 * 1000 });
            return res.redirect('http://localhost:5173/home'); 
        });
    })(req, res, next);
});

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', (req, res, next) => {
    passport.authenticate('github', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('http://localhost:5173/init-register'); 
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err); 
            }
            const token = generateToken(user); 
            res.cookie('token', token, {maxAge: 30 * 60 * 1000 });
            return res.redirect('http://localhost:5173/home'); 
        });
    })(req, res, next);
});

router.post("/", userValidator.validateUserData(), (req, res) => userController.createUser(req, res))
router.post('/verifyEmail', userValidator.validateUserEmail(), (req, res) => userController.verifyUserForEmail(req, res))
router.post('/login', cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))
router.post('/carrito/:id',  userValidator.validateUserUpdateDataById(), (req, res) => userController.updateCarritoUser(req, res))
router.post('/favorite/:id',  userValidator.validateUserUpdateDataById(), (req, res) => userController.updateFavoireteUser(req, res))
router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.put('/carrito/:id',  userValidator.validateUserUpdateDataById(), (req, res) => userController.deleteCarritoUser(req, res))
router.put('/deleteCarrito/:id',  userValidator.validateUserUpdateDataById(), (req, res) => userController.deleteProductCarritoUser(req, res))
router.delete('/:id', userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));

module.exports = router;        