const {fetchDogs, uploadDog} = require("../models")


exports.fetchDogs = (req, res, next) => {
    console.log("in get files")
    fetchDogs()
    .then(files=>{
        res.status(200).send(files)
    })
    .catch(err => {
        next(err)
    })
}

exports.postDog = (req, res, next) => {
    uploadDog()
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(err=>{next(err)})
}