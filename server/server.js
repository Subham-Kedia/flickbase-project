const express = require("express")
const mongoose = require("mongoose")

const app = express()

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on ${port}`))