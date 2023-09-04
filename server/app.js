const express = require("express")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const bodyParser = require("body-parser")
const passport = require("passport")

const { handleError, convertToApiError } = require("./middlewares/errorApi")
const { jwtStrategy } = require("./middlewares/passport")

const routes = require("./routes")
require("./mongoose")

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

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

app.use("/api", routes)

// middleware for error handling
app.use(convertToApiError)
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
