const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinderUser:HG4qLqrhCu0gqjOB@cluster0.w6ermvj.mongodb.net/devTinder",
  );
};

module.exports = connectDB;