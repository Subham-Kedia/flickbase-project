const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/errorApi")
const { isStrongPassword } = require("../data/utils")

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Please provide a valid email"
          )
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      validate(value) {
        if (!isStrongPassword(value)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Please use a strong password"
          )
        }
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    firstName: {
      type: String,
      maxLength: 25,
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 25,
      trim: true,
    },
    age: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          if (this.firstName && this.lastName)
            return this.firstName + " " + this.lastName
          else return undefined
        },
      },
    },
    toObject: {
      flattenObjectIds: true,
      virtuals: true,
    },
  }
)

userSchema.pre("save", async function (next) {
  let user = this
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
  }
  next()
})

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email })
  if (!user) return false
  return true
}

userSchema.methods.generateToken = async function () {
  const user = this
  const userObj = { sub: user._id.toHexString(), email: user.email }
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" })
  return token
}

userSchema.methods.comparePassword = async function (password) {
  const user = this
  const match = await bcrypt.compare(password, user.password)
  return match
}

const User = mongoose.model("User", userSchema)

module.exports = { User }
