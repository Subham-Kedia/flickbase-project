const express = require("express")
const authController = require("../controller/authController")
const auth = require("../middlewares/auth")
const authRoute = express.Router()

authRoute.post("/signup", authController.signup)
authRoute.post("/login", authController.login)
authRoute.get("/isauth", auth(), authController.isauth)

module.exports = authRoute
