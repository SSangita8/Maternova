const mongoose = require("mongoose");
const fs = require("fs");
const DietaryModel = require("./models/DietaryModel");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

fs.readFile(
  "../backend/formatted_pregnancy_guide.json",
  "utf8",
  (err, data) => {
    if (err) {
      console.error("", err);
      mongoose.connection.close();
      return;
    }

    const jsonData = JSON.parse(data);

    DietaryModel.create(jsonData)
      .then(() => {
        console.log("Data inserted successfully");
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        mongoose.connection.close();
      });
  }
);
