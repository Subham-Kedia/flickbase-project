const express = require("express")
const authController = require("../controller/authController")
const authRoute = express.Router()

authRoute.post("/signup", authController.signup)
authRoute.post("/login", authController.login)

module.exports = authRoute
