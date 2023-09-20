const { articleService } = require("../services")
const articleController = {
  async createArticle(req, res, next) {
    try {
      const article = await articleService.addArticle(req.body)
      res.send({
        article: res.locals.permission.filter(article.toObject()),
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = articleController
