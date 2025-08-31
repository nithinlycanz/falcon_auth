require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/falconauth";

// Connect to MongoDB with timeout and error handling
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // 5 second timeout
    socketTimeoutMS: 45000, // 45 second socket timeout
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.log(
      "💡 Make sure MongoDB is running or update MONGODB_URI in .env"
    );
    console.log(
      "💡 For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>"
    );
    process.exit(1);
  });

module.exports = app;
