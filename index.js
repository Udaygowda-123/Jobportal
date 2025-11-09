const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS FIX
app.use(
  cors({
    origin: [
      "https://jobportal-frontend-fzllke2qp-uday-rs-projects-040286a7.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// DB Connection
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running with proper CORS");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));

app.listen(port, () => console.log(`Server running on port ${port}`));
