const httpStatus = require("http-status")
const {ApiError} = require("../middlewares/errorApi")
const {userService} = require("../services")

const userController = {
    async getArticles(req,res,next) {
        try{
            res.json({
                articles: [
                    {
                        title: "article1",
                        description: "this is article 1"
                    },
                    {
                        title: "article2",
                        description: "this is article 2"
                    },
                ]
            })
        } catch(err){
            next(err)
        }

    }
}

module.exports = userController