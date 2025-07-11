const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Sequelize DB connection
const sequelize = require("./config/db");
sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected to MySQL"))
  .catch((err) => console.error("Sequelize connection error:", err));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://vagus.vercel.app",
];

// Add production domains
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Admin-Auth"],
  }),
);

// Route Imports
const testimonialRoutes = require("./routes/testimonialRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/admin");
const sliderRoutes = require("./routes/sliderRoutes");
const imageGalleryRoutes = require("./routes/imageGalleryRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminStudentRoutes = require("./routes/adminStudentRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Route Mounting
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/image-gallery", imageGalleryRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminStudentRoutes);
app.use("/api/events", eventRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("NEET Academy API is running");
});

// Sync Sequelize models (Optional)
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
