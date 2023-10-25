const bcrypt = require("bcryptjs")

const hashPass = (password) => {
    return bcrypt.hashSync(password)
}

const comparePass = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hashPass,
    comparePass
}