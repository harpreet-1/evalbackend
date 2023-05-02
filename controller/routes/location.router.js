const express = require("express");
const searchModel = require("../../models/userSearchmodel");

const locationRouter = express();
const Redis = require("ioredis");

// const redisClient = Redis();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const authantication = require("../middelware/userAuth");
const check = require("../middelware/Ipvalid");

// AuthMechanism for login check----------------------
locationRouter.use(authantication);

locationRouter.get("/:ip", async (req, res) => {
  try {
    // checking IP validation----------------------------------------
    if (!check(req.params.ip)) {
      return res.status(400).send("Invalid Ip address");
    }
    // storing user search in mongo db---------------------

    await searchModel.create({ IP: req.params.ip, userId: req.userId });
    const city = redisClient.get(req.params.ip);

    // checking if  data is alredy in redis catch--------------------------

    if (city) {
      return res.json({ city: data });
    }

    // getting city data  -------------------------------

    fetch(`https://ipapi.co/${req.params.ip}/city/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // storing data in redis--------------------------
        redisClient.set(req.params.ip, data, "EX", 60 * 60 * 6);
        res.json({ city: data });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = locationRouter;
