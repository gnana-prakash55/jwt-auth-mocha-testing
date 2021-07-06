const chai = require("chai");
const app = require("../../index");
const should = chai.should();


const loginUser = (done) => {
  let login = {
    email: "sanjay@gmail.com",
    password: "pass",
  };
  chai
    .request(app)
    .post("/signin")
    .send(login)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Signed in Successfully");
      res.body.should.have.property("token");
      var token = res.body.token;

      //   Accessing User protected route /profile
      chai
        .request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Authorized User");
          res.body.should.have.property("user");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          done();
        });
    });
};

const notloginUser = (done) => {
  let login = {
    email: "san@gmail.com",
    password: "pass",
  };
  chai
    .request(app)
    .post("/signin")
    .send(login)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error").eql("Wrong Credentials");
      done();
    });
};

module.exports = { loginUser, notloginUser };
