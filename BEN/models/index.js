const AWS = require('aws-sdk');
const {aws_access_key_id, aws_secret_access_key} = require("../aws-credentials")
const s3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key})
const fs = require("fs")

exports.fetchDogs = async () => {
    const promise = await s3.listObjectsV2({
        Bucket: 'dogs',
    }).promise().catch(err=>{console.log(err)})
    return promise
}

exports.uploadDog = (file) => {
    if (err) console.log(err)
     const params = {
        Bucket: 'dogs',
        Key: new Date.now(),
        Body: file
     }
    const promise = await s3.upload(params).promise().catch(err=>console.log(err))
    return promise
}
