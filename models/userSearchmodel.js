const mongoose = require("mongoose");
const searchSchema = mongoose.Schema({
  IP: { require: true, type: String },
  userId: { require: true, type: String },
});
const searchModel = mongoose.model("userSearch", searchSchema);

module.exports = searchModel;
