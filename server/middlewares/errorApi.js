const mongoose = require("mongoose")
const httpStatus = require("http-status")

class ApiError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err
  res.status(statusCode).json({
    status: "failed",
    data: {},
    message,
  })
}

const convertToApiError = (err, req, res, next) => {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    let message = error.message || httpStatus[statusCode]
    if (error instanceof mongoose.Error.ValidationError) {
      if (error.errors.password) message = error.errors.password.message
      if (error.errors.email) message = error.errors.email.message
    }
    error = new ApiError(statusCode, message)
  }

  next(error)
}

module.exports = { ApiError, handleError, convertToApiError }
