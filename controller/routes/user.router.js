const express = require("express");
const userModel = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
// const redisClient = new Redis();
// const redisClient = ;
const router = express.Router();

//  register new user-----------------------------------
const registerUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.json("user alredy exists");
    }
    req.body.password = await bcrypt.hash(req.body.password, 4);
    await userModel.create(req.body);
    res.send("user registered");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// login user and provide token-----------------------------

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("user not found");
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          "secret",
          { expiresIn: "1h" }
        );
        res.json({ token: token });
      } else {
        return res.status(401).json("wrong crendential");
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// logout user and store token in redis catch-------------------------------

const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    redisClient.set(token, "blacklisted");
    res.status(200).send("logout succesfull");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all user-----------------------

const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// routes handling-----------------------------------------

router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/", getUser);
router.post("/login", loginUser);

module.exports = router;
