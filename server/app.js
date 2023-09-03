const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const bodyParser = require("body-parser")
const routes = require("./routes")
require("dotenv").config()

const { handleError, convertToApiError } = require("./middlewares/errorApi")
const {jwtStrategy} = require("./middlewares/passport")
const passport = require("passport")

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}?retryWrites=true&w=majority`

const app = express()
app.use(bodyParser.json())
app.use(xss())
app.use(mongoSanitize())
mongoose.set("strictQuery", true)
mongoose.connect(url)

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

app.use("/", routes)
// error handling
app.use(convertToApiError)
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
