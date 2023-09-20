const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { User } = require("../models/userModel")
const { findUserByEmail } = require("./userService")

const createUser = async (email, password, firstName, lastName, age) => {
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
      firstName,
      lastName,
      age
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

const signInWithEmailandPassword = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    if (!user)
      throw new ApiError(httpStatus.BAD_REQUEST, "Email Does not Exist")
    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password")
    }
    return user
  } catch (err) {
    throw err
  }
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

module.exports = {
  createUser,
  getAuthToken,
  verifyUser,
  signInWithEmailandPassword,
}
