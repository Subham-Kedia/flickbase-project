const { User } = require("../models/userModel")
const { ApiError } = require("../middlewares/errorApi")
const httpStatus = require("http-status")
const jwt = require("jsonwebtoken")

const findUserByEmail = async (email) => {
  try {
    const user = User.findOne({ email })
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "user not found")
    return user
  } catch (err) {
    throw err
  }
}

const findUserById = async (_id) => {
  try {
    const user = await User.findById(_id)
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "user not found")
    return user
  } catch (err) {
    throw err
  }
}

const updateProfile = async (req) => {
  try {
    const user = User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
        },
      },
      {
        returnDocument: "after",
      }
    )
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "user not found")
    return user
  } catch (err) {
    throw err
  }
}

const updateEmail = async (req) => {
  try {
    if (await User.isEmailTaken(req.body.newEmail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry Email Already Taken")
    }
    const user = User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: {
          email: req.body.newEmail,
          verified: false,
        },
      },
      {
        returnDocument: "after",
      }
    )
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "user not found")
    return user
  } catch (err) {
    throw err
  }
}

const verifyVerificationToken = (token) => {
  return jwt.verify(token, process.env.DB_SECRET)
}

module.exports = {
  findUserByEmail,
  findUserById,
  updateProfile,
  updateEmail,
  verifyVerificationToken,
}
