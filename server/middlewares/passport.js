const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const { User } = require("../models/userModel")

const jwtOptions = {
  secretOrKey: process.env.DB_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
  try {
    console.log(payload)
    const user = await User.findById(payload.sub)
    if (!user) return done(null, false)
    else return done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
  jwtStrategy,
}
