const express = require("express")
const articleRoute = express.Router()
const articleController = require("../controller/articleController")
const auth = require("../middlewares/auth")

articleRoute.post(
  "/create",
  auth("createAny", "article"),
  articleController.createArticle
)

module.exports = articleRoute
