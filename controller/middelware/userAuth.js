const jwt = require("jsonwebtoken");

const authantication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "secret");

    if (!decoded) {
      return res.status(400).json({ message: "please login again" });
    }
    res.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "please login again" });
  }
};

module.exports = authantication;
