const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: { require: true, type: String },
  password: { require: true, type: String },
});
const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
