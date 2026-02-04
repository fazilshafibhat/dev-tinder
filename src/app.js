const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database.config");
const User = require("./models/user.model");
const { validateSignUpData } = require("./utils/validation");
const { ApiError, sendSuccess, sendError } = require("./utils/response.util");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const PORT = 3000;
app.use(express.json()); // middleware to convert json object into JS object

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, age, gender, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new ApiError(400, "Invalid email format");
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      throw new ApiError(409, "User already exists with this email");
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      password: passwordHash,
    });

    const newUser = await user.save();

    return sendSuccess(res, 201, "User registered successfully", newUser);
  } catch (error) {
    console.error("Signup error:", error);
    return sendError(res, error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    if (!validator.isEmail(emailId)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new ApiError(404, "Account not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    return sendSuccess(res, 200, "Login successful", {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendError(res, error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find().lean();

    return sendSuccess(res, 200, "Users fetched successfully", users, {
      count: users.length,
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return sendError(res, error);
  }
});

const startServer = async () => {
  try {
    console.log("Initializing application startup...");

    await connectDB();
    console.log("Database connection established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}.`);
    });
  } catch (error) {
    console.error(
      "Failed to start the application due to a database connection error.",
    );
    console.error("Error details:", error);
    process.exit(1);
  }
};

startServer();
