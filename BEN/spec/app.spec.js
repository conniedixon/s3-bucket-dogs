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
describe("ERROR HANDLING", () => {
    it("returns 404 for path not found", () => {
        return request(app)
        .get("/ap/")
        .expect(404)
        .then(({body: {msg}})=>{
            expect(msg).to.eql("Path not found")
        })
    })
    it("returns 405 for method not allowed", () => {
        const invalidMethods = [ "put", "patch", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Invalid method");
            });
        });
        return Promise.all(methodPromises);
    })
})