const express = require('express')
const ControllerPublic = require('../controllers/controllerPublic')
const { authentication } = require('../middlewares/auth')
const publicRouter = express.Router()

publicRouter.post('/register', ControllerPublic.register)
publicRouter.post('/login', ControllerPublic.login)
publicRouter.post('/login/google', ControllerPublic.googleLogin)
publicRouter.get('/products', ControllerPublic.readAllProducts)
publicRouter.get('/products/qr/:id', ControllerPublic.qrDetail)
publicRouter.get('/products/:id', ControllerPublic.readProductById)

publicRouter.use(authentication)

publicRouter.get('/wishlist', ControllerPublic.readWishlist)
publicRouter.post('/wishlist/:id', ControllerPublic.addWishlist)
publicRouter.delete('/wishlist/:id', ControllerPublic.deleteWishlist)




module.exports = publicRouter