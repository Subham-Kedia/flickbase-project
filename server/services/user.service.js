const { User } = require("../models/user")

const findUserByEmail = async (email) => {
    User.emailTaken(email)
}