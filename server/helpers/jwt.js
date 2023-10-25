const jwt = require("jsonwebtoken")
// require('dotenv').config()

const createToken = (payload) => {
    return jwt.sign(payload, process.env.secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.secret)
}

module.exports = {
    createToken,
    verifyToken
}