const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { userService, authService, emailService } = require("../services")

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

      // send verification link to new Email
      await emailService.registerEmail(req.body.newEmail, user)
      res.cookie("x-access-token", token).send({
        user: res.locals.permission.filter(user.toObject()),
        token,
      })
    } catch (err) {
      next(err)
    }
  },
  async verifyEmail(req, res, next) {
    try {
      const userObject = userService.verifyVerificationToken(req.body.token)
      const user = userService.findUserById(userObject.sub)
      if (!user) throw ApiError(httpStatus.NOT_FOUND, "User Not Found")
      user.verified = true
      await user.save()
      res.send({ message: "email verified successfully" })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
