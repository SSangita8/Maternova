// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const riskCheckRoutes = require("./routes/riskCheckRoutes");
const foodsToAvoidRoutes = require("./routes/foodToAvoidRoutes");

const app = express();

// Connect to database
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use("/auth", authRoutes);
app.use("/ques", questionRoutes);
app.use("/risk", riskCheckRoutes);
app.use("/food", foodsToAvoidRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
