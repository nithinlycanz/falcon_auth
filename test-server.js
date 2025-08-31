// Simple test to verify the API structure without MongoDB
const express = require("express");

const app = express();
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API structure is working!",
    endpoints: [
      "POST /api/auth/signup",
      "POST /api/auth/login",
      "GET /api/auth/profile",
    ],
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🧪 Test server running on port ${PORT}`);
  console.log(`📝 Test endpoint: http://localhost:${PORT}/test`);
});

module.exports = app;
