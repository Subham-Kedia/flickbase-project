const express = require("express")
const router = express.Router()
const authRoute = require("./auth.route")
const userRoute = require("./userRoute")

const routesIndex = [
    {
        path:"/auth",
        route:authRoute
    },
    {
        path:"/user",
        route:userRoute
    }
]

routesIndex.forEach(route => {
    router.use(route.path, route.route)
})

module.exports = router