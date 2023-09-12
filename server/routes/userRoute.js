const express = require("express")

const auth = require("../middlewares/auth")
const userController = require("../controller/userController")
const userRoute = express.Router()

userRoute
  .route("/profile")
  .get(auth("readOwn", "profile"), userController.getProfile)
  .patch(auth("updateOwn", "profile"), userController.updateProfile)

userRoute.patch("/updateEmail", auth("updateOwn", "profile"), userController.updateUserEmail)

module.exports = userRoute
