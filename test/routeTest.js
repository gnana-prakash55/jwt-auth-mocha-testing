process.env.NODE_ENV = "testing";

const User = require("../models/user");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(async () => {
    await User.deleteMany({}, (err) => {});
  });

  //    Testing /GET users route
  describe("/GET users", () => {
    it("It should get all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Testing /POST user route
  describe("/POST user", () => {
    it("It should post the user", (done) => {
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
    });
  });
});

describe("Login User", () => {
  // Testing /POST signin route
  describe("/POST signin", () => {
    it("It should login the user and access the user protected /profile route",(done) => {
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
          res.body.should.have
            .property("message")
            .eql("Signed in Successfully");
          res.body.should.have.property("token");
          var token = res.body.token;
        

          //   Accessing User protected route /profile
           chai
            .request(app)
            .get('/profile')
            .set('Authorization',`Bearer ${token}`)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Authorized User');
                res.body.should.have.property('user');
                res.body.user.should.have.property("name");
                res.body.user.should.have.property("email");
            done();
            })
        });
    });

    it("It should not login the user", (done) => {
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
    });
  });
});
