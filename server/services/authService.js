const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { User } = require("../models/user")

const createUser = async (email, password) => {
  try {
    if (await User.isEmailTaken(email)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry, this email is already in use"
      )
    }
    const user = new User({
      email,
      password,
    })
    await user.save()
    return user
  } catch (error) {
    throw error
  }
}

const getAuthToken = (user) => {
  const token = user.generateToken()
  return token
}

const verifyUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    if (await user.comparePassword(password)) return true
    else
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Please enter a valid password"
      )
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please enter a valid email")
  }
}

module.exports = { createUser, getAuthToken, verifyUser }
