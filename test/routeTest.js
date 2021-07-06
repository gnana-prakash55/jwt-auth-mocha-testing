process.env.NODE_ENV = "testing";

const User = require("../models/user");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const createUser = require("./routes/test.createUser");
const { notloginUser, loginUser } = require("./routes/test.loginUser");
const getAllUsers = require("./routes/test.getAllUsers");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(async () => {
    await User.deleteMany({}, (err) => {});
  });

  // Testing /GET users route
  describe("/GET users", () => {
    it("It should get all users",(done)=> getAllUsers(done));
  });

  // Testing /POST user route
  describe("/POST user", () => {
    it("It should post the user",(done) => createUser(done));
  });

});

describe("Login User", () => {
    // Testing /POST signin route
    describe("/POST signin", () => {
      it(
        "It should login the user and access the user protected /profile route",(done)=> loginUser(done)
      );

      it("It should not login the user",(done) => notloginUser(done));
    });
  });

