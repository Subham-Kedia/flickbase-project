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
      const user = await authService.signInWithEmailandPassword(email, password)
      const token = await authService.getAuthToken(user)

      res.cookie("x-access-token", token).send({ user, token })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = authController
