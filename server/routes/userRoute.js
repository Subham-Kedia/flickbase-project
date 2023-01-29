const express = require("express")
// middlewares
const auth = require("../middlewares/auth")

const userController = require("../controller/userController")

const router = express.Router()

router.get("/getarticles", auth("readAny", "articles"), userController.getArticles)

module.exports = router