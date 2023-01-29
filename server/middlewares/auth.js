const passport = require("passport")
const { ApiError } = require("./errorApi")
const httpStatus = require("http-status")

const verify = (req,res,resolve,reject) => async(error,user) => {
    if(error || !user){
        return reject(new ApiError(httpStatus.UNAUTHORIZED, "sorry, unauthorized"))
    }
    resolve()
}

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verify(req, res, resolve, reject)
    )(req, res, next)
  })
    .then(() => next())
    .catch(error => next(error))
}

module.exports = auth
