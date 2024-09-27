const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, process.env.KEY_SECRET, {expiresIn: '30m'});
};

module.exports = generateToken