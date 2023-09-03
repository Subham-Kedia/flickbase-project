const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const bodyParser = require("body-parser")
const routes = require("./routes")

const { handleError, convertToApiError } = require("./middlewares/errorApi")
const { jwtStrategy } = require("./middlewares/passport")
const passport = require("passport")

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}?retryWrites=true&w=majority`

const app = express()

// middleware for parsing application/json
app.use(bodyParser.json())

// middleware to sanitize xss(cross site scripting) req.body, req.params, req.query
// must be used before passing to routes
app.use(xss())

// middleware to sanitize mongoDB operator from req.body, req.params, req.query
// must be used before passing to routes
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] has been sanitized`, req)
    },
  })
)

mongoose.set("strictQuery", true)
mongoose.connect(url)

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

app.use("/", routes)

// middleware for error handling
app.use(convertToApiError)
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
