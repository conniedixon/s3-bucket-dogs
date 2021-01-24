const chai = require("chai")
const request = require("supertest")
const chaiSorted = require("chai-sorted");
const { expect } = chai.use(chaiSorted);
const app = require("../app")

describe("APP", () => {
    it("returns an array of objects in s3", () => {
        return request(app)
        .get("/api/")
        .expect(200)
        .then(({body: {Contents}}) => {
            expect(Contents).to.be.an("array")
            expect(Contents[0]).to.be.an("object")
        })
    })
    it("uploads a file to s3", () => {
        return fs.readFile("spec/testImage.jpg", async (err, data) => { 
            return request(app)
            .post("/api/")
            .send(data)
            .expect(200)
            .then(({body}) => {
                expect(body).to.be.an("object")
                expect(body).to.contain.keys(["ETag", "Location", "Key", "Bucket"])
            })
        })
    })
})