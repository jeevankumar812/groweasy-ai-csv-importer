require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const importRoutes = require("./routes/importRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use("/api/uploads", express.static("uploads"));

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GrowEasy CSV Import API Running 🚀",
    });
});

// Routes
app.use("/api/import", importRoutes);

// Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});