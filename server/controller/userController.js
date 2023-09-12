const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { userService, authService } = require("../services")

const userController = {
  async getProfile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id)
      res.json({ user: res.locals.permission.filter(user.toObject()) })
    } catch (err) {
      next(err)
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateProfile(req)
      res.json({ user: res.locals.permission.filter(user.toObject()) })
    } catch (err) {
      next(err)
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateEmail(req)
      const token = await authService.getAuthToken(user)

      res.cookie("x-access-token", token).send({
        user: res.locals.permission.filter(user.toObject()),
        token,
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
