const { verifyToken } = require("../helpers/jwt")
const {User, Product, Category} = require("../models")

async function authentication(req, res, next){
    try {   
        let {access_token} = req.headers

        let payload = verifyToken(access_token)
        
        let user = await User.findByPk(payload.id)
        if(!user){
        throw {name: "Unauthorized"}
    }

    req.user = {
        id: user.id,
        role: user.role
    }
    next()
    } catch (err) {
        next(err)      
    }
}

async function authorization (req, res, next){
    try {
        let {id, role} = req.user
        let product = await Product.findByPk(req.params.id)

        if(!product){
            throw {name: "Not Found"}
        }
        
        if(role !== "Admin"){
            if(id !== product.authorId){
                throw {name: "Forbidden"}
            }
            next()
        }
        next()
    
    } catch (err) {
        next(err)
    }
}

async function statusAuthorization (req, res, next){
    try {
        let {id, role} = req.user

        if(role !== "Admin"){
            throw {name: "Forbidden"}
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization,
    statusAuthorization
}