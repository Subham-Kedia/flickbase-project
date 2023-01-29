const passport = require("passport");
const { ApiError } = require("./errorApi");
const httpStatus = require("http-status");
const { roles } = require("../config/roles");

const verify = (req, res, resolve, reject, rights) => async (error, user) => {
  if (error || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "sorry, unauthorized"));
  }
  req.user = {
    _id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    verified: user.verifed,
  };
  if (rights.length) {
    const action = rights[0];
    const resource = rights[1];
    const permission = roles.can(req.user.role)[action](resource);
    if (!permission.granted) {
      return reject(
        new ApiError(
          httpStatus.FORBIDDEN,
          "you dont have rights for this action"
        )
      );
    }
  }
  resolve();
};

const auth =
  (...rights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((error) => next(error));
  };

module.exports = auth;
