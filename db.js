const mongoose = require("mongoose");
const connectiondb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harpreetllg:harpreetllg@cluster0.4gj2jam.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectiondb;
