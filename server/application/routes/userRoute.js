// Importing necessary modules
const express = require('express'); // Importing the Express framework
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const passport = require('passport'); // Importing Passport for authentication
const generateToken = require('../middlewares/token'); // Importing token generation middleware
const { auth } = require('../middlewares/authenticateToken'); // Importing token authentication middleware
const UserController = require("../controllers/userController"); // Importing the UserController
const UserValidator = require("../validator/userValidator"); // Importing the UserValidator

// Creating an Express router instance
const router = express.Router();
const userController = new UserController(); // Instantiating the UserController
const userValidator = new UserValidator(); // Instantiating the UserValidator

/**
 * @route GET /getAllUsersTypeArtesano
 * @group Users - Operations about users
 * @returns {Array} 200 - An array of artesano users
 * @returns {Error}  500 - Internal server error
 */
router.get("/getAllUsersTypeArtesano", userValidator.validateUserDataEmpty(), (req, res) => 
    userController.getAllUsersController(req, res) // Fetching all artesano users
);

/**
 * @route GET /{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @returns {Object} 200 - The requested user
 * @returns {Error}  404 - User not found
 */
router.get("/:id", userValidator.validateUserDataEmpty(), (req, res) => 
    userController.getUser(req, res) // Fetching a specific user by ID
);

/**
 * @route GET /auth/google
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to Google authentication
 */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route GET /auth/google/callback
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to home after authentication
 * @returns {Error}  500 - Internal server error
 */
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('http://localhost:5173/init-register'); // Redirecting if no user found
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err); 
            }
            const token = generateToken(user); // Generating a token for the user
            res.cookie('token', token, { maxAge: 30 * 60 * 1000 }); // Setting token cookie
            return res.redirect('http://localhost:5173/home'); // Redirecting to home
        });
    })(req, res, next);
});

/**
 * @route GET /auth/github
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to GitHub authentication
 */
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @route GET /auth/github/callback
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to home after authentication
 * @returns {Error}  500 - Internal server error
 */
router.get('/auth/github/callback', (req, res, next) => {
    passport.authenticate('github', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('http://localhost:5173/init-register'); // Redirecting if no user found
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err); 
            }
            const token = generateToken(user); // Generating a token for the user
            res.cookie('token', token, { maxAge: 30 * 60 * 1000 }); // Setting token cookie
            return res.redirect('http://localhost:5173/home'); // Redirecting to home
        });
    })(req, res, next);
});

/**
 * @route GET /auth/discord
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to discord authentication
 */
router.get('/auth/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));

/**
 * @route GET /auth/discord/callback
 * @group Authentication - Operations for authentication
 * @returns {Object} 302 - Redirects to home after authentication
 * @returns {Error}  500 - Internal server error
 */
router.get('/auth/discord/callback', (req, res, next) => {
    passport.authenticate('discord', { session: false }, (err, user, info) => {
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

/**
 * @route POST /
 * @group Users - Operations about users
 * @param {User.model} user.body.required - User data to create
 * @returns {Object} 201 - The created user
 * @returns {Error}  400 - Invalid user data
 */
router.post("/", userValidator.validateUserData(), (req, res) => 
    userController.createUser(req, res) // Creating a new user
);

/**
 * @route POST /verifyEmail
 * @group Users - Operations about users
 * @param {UserEmail.model} email.body.required - User email to verify
 * @returns {Object} 200 - Verification result
 * @returns {Error}  400 - Invalid email
 */
router.post('/verifyEmail', userValidator.validateUserEmail(), (req, res) => 
    userController.verifyUserForEmail(req, res) // Verifying user email
);

/**
 * @route POST /login
 * @group Users - Operations about users
 * @param {UserLogin.model} login.body.required - User login data
 * @returns {Object} 200 - Login result
 * @returns {Error}  401 - Unauthorized
 */
router.post('/login', cookieParser(), userValidator.validateUserLogin(), (req, res) => 
    userController.verifyUserCookies(req, res) // Verifying user login with cookies
);

/**
 * @route POST /carrito/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.post('/carrito/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.updateCarritoUser(req, res) // Updating user's shopping cart
);

/**
 * @route POST /favorite/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.post('/favorite/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.updateFavoireteUser(req, res) // Updating user's favorites
);

/**
 * @route PUT /{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user to update
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.updateUser(req, res) // Updating user data
);

/**
 * @route PUT /carrito/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.put('/carrito/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.deleteCarritoUser(req, res) // Deleting user's shopping cart
);

/**
 * @route PUT /deleteCarrito/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.put('/deleteCarrito/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.deleteProductCarritoUser(req, res) // Deleting a product from user's shopping cart
);

/**
 * @route PUT /deleteFavorite/{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user
 * @param {UserUpdate.model} userUpdate.body.required - Updated user data
 * @returns {Object} 200 - The updated user
 * @returns {Error}  400 - Invalid user update data
 */
router.put('/deleteFavorite/:id', userValidator.validateUserUpdateDataById(), (req, res) => 
    userController.deleteProductFavoriteUser(req, res) // Deleting a product from user's favorites
);

/**
 * @route DELETE /{id}
 * @group Users - Operations about users
 * @param {string} id.path.required - The ID of the user to delete
 * @returns {Object} 204 - User deleted successfully
 * @returns {Error}   404 - User not found
 */
router.delete('/:id', userValidator.validateUserId(), (req, res) => 
    userController.deleteUser(req, res) // Deleting a user
);

// Exporting the router to be used in the main application
module.exports = router; 
