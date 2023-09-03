const {User} = require("../models/user")
const {ApiError} = require("../middlewares/errorApi")
const httpStatus = require("http-status")

const findUserByEmail = async (email) => {
  try {
    const user = User.findOne({email})
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
      {_id: req.user._id},
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

module.exports = {findUserByEmail, findUserById, updateProfile}
