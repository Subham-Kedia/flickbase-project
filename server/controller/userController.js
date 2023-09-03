const httpStatus = require("http-status")
const {ApiError} = require("../middlewares/errorApi")
const {userService} = require("../services")

const userController = {
    async getProfile(req,res,next) {
        try{
            const user = await userService.findUserById(req.user._id)
            res.json(res.locals.permission.filter(user._doc))
        } catch(err){
            next(err)
        }
    },
    async updateProfile(req,res,next) {
        try{
            const user = await userService.updateProfile(req)
            res.json(res.locals.permission.filter(user._doc))
        } catch(err){
            next(err)
        }
    }
}

module.exports = userController