console.log("Testing backend dependencies...");
try {
  const express = require("express");
  const cors = require("cors");
  const dotenv = require("dotenv");
  console.log("✅ All dependencies loaded successfully");
  console.log("Backend is ready to start");
  process.exit(0);
} catch (error) {
  console.error("❌ Error loading dependencies:", error.message);
  process.exit(1);
}
