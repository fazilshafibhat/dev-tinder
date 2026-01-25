const express = require("express");
const connectDB = require("./config/database.config");
const User = require("./models/user.model");

const app = express();
const PORT = 3000;

app.post("/signup", async (req, res)=>{
  const userObj = {
    firstName : "Fazil",
    lastName: "Bhat",
    emailId: "fazil@gmail.com",
    age : 27,
    gender: "Male"
  }
  const user = new User(userObj);
  const newUser = await user.save()
  console.log("user created: ", newUser)
  res.send("user created successfully")
})

const startServer = async () => {
  try {
    console.log("Initializing application startup...");

    await connectDB();
    console.log("Database connection established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}.`);
    });

  } catch (error) {
    console.error("Failed to start the application due to a database connection error.");
    console.error("Error details:", error);
    process.exit(1);
  }
};

startServer();