const express = require('express')
const Controller = require('../controllers/controller')
const { authentication, authorization, statusAuthorization } = require('../middlewares/auth')
const adminRouter = express.Router()

adminRouter.post('/register', Controller.register)
adminRouter.post('/login', Controller.login)
adminRouter.post('/login/google', Controller.googleLogin)

adminRouter.use(authentication)
adminRouter.post("/products", Controller.addProduct)
adminRouter.get("/products", Controller.readAllProducts)
adminRouter.get("/products/:id", Controller.readProductById)
adminRouter.put("/products/:id", authorization, Controller.updateProduct)
adminRouter.patch("/products/:id", statusAuthorization , Controller.updateStatusProduct)
adminRouter.delete("/products/:id", authorization, Controller.deleteProduct)
adminRouter.get("/categories", Controller.readAllByCategory)
adminRouter.post("/categories", Controller.addCategory)
adminRouter.get("/categories/:id", Controller.readCategoryById)
adminRouter.patch("/categories/:id", Controller.updateCategory)
adminRouter.delete("/categories/:id", Controller.deleteCategory)
adminRouter.get("/history", Controller.readHistory)

module.exports = adminRouter