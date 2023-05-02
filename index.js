const express = require("express");

const app = express();
const winston = require("winston");
const cors = require("cors");

const router = require("./controller/routes/user.router");
const locationRouter = require("./controller/routes/location.router");

const connectiondb = require("./db");
const { log } = require("console");

app.use(cors());
app.use(express.json());
app.use("/users", router);
app.use("/location", locationRouter);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.listen(8000, () => {
  connectiondb();
  console.log("sever is running at port 8000");
});
