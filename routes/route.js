const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.get('/users',async (req,res) => {
  try {
      const users = await User.find()
      res.status(200).send(users)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    delete user.password;
    res.status(200).json({ message: "User Created",user});
  } catch (error) {
    console.log(error);
    res.status(400).send({error:"Something happen!!!😲"});
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error();

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) throw new Error();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    await User.updateOne(
      { _id: user._id },
      {
        $push: { jwt: token },
      }
    );

    res.status(200).send({message:"Signed in Successfully",token: token});
  } catch (error) {
    res.status(400).send({error:"Wrong Credentials"});
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await req.user;
    console.log(user)
    res.status(200).send({ message: "Authorized User" ,user});
  } catch (error) {
    res.status(400).send({error: "Something went wrong!!"},err);
  }
});

router.get("/signout", auth, async (req, res) => {
  const user = req.user;
  await User.updateOne(
    { _id: user._id },
    {
      $pull: {
        jwt: req.token,
      },
    }
  );
  res.status(200).send({message:"You are signed out Successfully"})
});

module.exports = router;
