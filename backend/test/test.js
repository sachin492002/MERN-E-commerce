const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../server");



chai.should();
chai.use(chaihttp);

describe("Shop Api", () => {

    //Test Get
    describe("GET All Products", () => {
        it("It should return al list of products", (done) => {
            chai.request(server)
                .get("/products")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('price');
                    response.body.should.have.property('company')
                    done();
                })
        })
    })
    describe("GET All Feedbacks", () => {
        it("It should return al list of feedbacks", (done) => {
            chai.request(server)
                .get("/feeds")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('id')
                    done();
                })
        })
    })
    describe("GET all users", () => {
        it("It should return al list of users", (done) => {
            chai.request(server)
                .get("/usersAll")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('id')
                    done();
                })
        })
    })
})