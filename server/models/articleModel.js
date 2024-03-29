const mongoose = require("mongoose")

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 100,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please add some content"],
    },
    excerpt: {
      type: String,
      required: [true, "Please add an excerpt"],
      maxLength: 500,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      index: true,
    },
    director: {
      type: String,
      required: true,
    },
    actors: {
      type: [String],
      required: true,
      validate: {
        validator: (array) => {
          return array.length > 2
        },
        message: "You must add at least three actors",
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "public"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      flattenObjectIds: true,
      virtuals: true,
    },
  }
)

const Article = mongoose.model("Article", articleSchema)
module.exports = { Article }
