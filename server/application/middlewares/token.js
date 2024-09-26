const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    console.log("entro aqui y puedes ver ", user)
    return jwt.sign(user, process.env.KEY_SECRET, {expiresIn: '30m'});
};

module.exports = generateToken