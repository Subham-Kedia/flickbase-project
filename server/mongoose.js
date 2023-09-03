const mongoose = require("mongoose")
const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.set("strictQuery", true)

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionURL)
    console.log("Mongoose connected successfully")
  } catch (err) {
    console.log("ERROR-mongoose connection: ", err.message)
  }
}

connectToDB()
