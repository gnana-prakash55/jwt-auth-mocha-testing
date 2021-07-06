const chai = require("chai");
const app = require("../../index");
const should = chai.should();

const createUser = (done) => {
  let user = {
    name: "Sanjay",
    email: "sanjay@gmail.com",
    password: "pass",
  };
  chai
    .request(app)
    .post("/signup")
    .send(user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("User Created");
      res.body.user.should.have.property("name");
      res.body.user.should.have.property("email");
      done();
    });
};

module.exports = createUser;
