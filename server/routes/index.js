const express = require("express")
const router = express.Router()
const authRoute = require("./authRoute")
const userRoute = require("./userRoute")
const articleRoute = require("./articlesRoute")

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/articles",
    route: articleRoute,
  },
]

routesIndex.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
