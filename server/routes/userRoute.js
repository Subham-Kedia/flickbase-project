const express = require("express")
// middlewares
const auth = require("../middlewares/auth")

const userController = require("../controller/userController")

const router = express.Router()

router.route("/profile")
.get(auth("readOwn", "profile"), userController.getProfile)
.patch(auth("updateOwn", "profile"), userController.updateProfile)

module.exports = router