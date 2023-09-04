const { authService } = require("../services")
const httpStatus = require("http-status")

const authController = {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await authService.createUser(email, password)
      const token = await authService.getAuthToken(user)
      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const verified = await authService.verifyUser(email, password)
      if (verified) res.status(200).send("user verified")
    } catch (error) {
      next(error)
    }
  },
  async isauth(req, res, next) {
    try {
      res.json(req.user)
    } catch (error) {}
  },
}

module.exports = authController
