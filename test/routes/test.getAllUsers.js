const chai = require("chai");
const app = require("../../index");
const should = chai.should();

const getAllUsers = (done) => {
  chai
    .request(app)
    .get("/users")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(0);
      done();
    });
};

module.exports = getAllUsers;
