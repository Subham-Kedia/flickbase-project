const httpStatus = require("http-status")
const { Article } = require("../models/articleModel")

const addArticle = async (body) => {
  try {
    const article = new Article(body)
    await article.save()
    return article
  } catch (error) {
    throw error
  }
}

module.exports = { addArticle }
