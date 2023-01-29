const express = require("express")
const authController = require("../controller/auth.controller")
const auth = require("../middlewares/auth")
const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/isauth", auth(), authController.isauth)
router.post("/testrole", auth("readAny", "test"), authController.testrole)

module.exports = router