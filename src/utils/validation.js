const validator = require("validator");
const { ApiError } = require("../utils/response.util");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !firstName.trim()) {
    throw new ApiError(400, "First name is required");
  }

  if (!lastName || !lastName.trim()) {
    throw new ApiError(400, "Last name is required");
  }

  if (!emailId) {
    throw new ApiError(400, "Email is required");
  }

  if (!validator.isEmail(emailId)) {
    throw new ApiError(400, "Invalid email format");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters with uppercase, lowercase, number and symbol"
    );
  }

  return true;
};

module.exports = { validateSignUpData };