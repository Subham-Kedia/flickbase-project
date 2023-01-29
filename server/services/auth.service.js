const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { User } = require("../models/user")
const createUser = async (email, password) => {
  try {
    if (await User.isEmailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "sorry email already taken")
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

const getAuthToken = user => {
  const token = user.generateToken()
  return token
}

const verifyUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    if (await user.comparePassword(password)) return true
    else throw new ApiError(httpStatus.BAD_REQUEST, "bad password")
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "email does not exist")
  }
}

module.exports = { createUser, getAuthToken, verifyUser }
