const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const bodyParser = require("body-parser")
require("dotenv").config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process
.env.DB_HOST}?retryWrites=true&w=majority`

const app = express()
app.use(bodyParser.json())
app.use(xss())
app.use(mongoSanitize())

mongoose.connect(url)


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on ${port}`))