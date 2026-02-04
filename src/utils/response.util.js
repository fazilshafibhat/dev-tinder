class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

const sendSuccess = (res, statusCode, message, data = null, extra = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...extra,
    data,
  });
};

const sendError = (res, error) => {
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = {
  ApiError,
  sendSuccess,
  sendError,
};