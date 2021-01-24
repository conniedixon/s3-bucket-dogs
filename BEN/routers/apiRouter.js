const express = require("express")
const apiRouter = express.Router()

const {getDogs, postDog} = require("../controllers")

apiRouter.route("/").get(getDogs).post(postDog)

module.exports = {apiRouter}