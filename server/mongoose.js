const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

let connecting = false
let connected = false

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL)
  } catch (err) {
    console.log("ERR-mongoose-initial-connection: ", err.message)
    setTimeout(connectToDB, 10000)
  }
}

mongoose.connection.on("connecting", () => {
  connecting = true
  console.log("connecting to MongoDB")
})
mongoose.connection.on("connected", () => {
  connected = true
  console.log("connected to MongoDB")
})
mongoose.connection.on("error", (err) => {
  connecting = false
  connected = false
  console.log("mongoose error", err)
})
mongoose.connection.on("disconnected", (err) => {
  console.log("mongoose disconnected")
  connected = false
  if (!connecting) setTimeout(connectToDB, 10000)
})

connectToDB()
