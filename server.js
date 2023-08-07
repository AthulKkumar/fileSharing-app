require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();
connectDb();
// Cors
const corsOption = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};

app.use(cors(corsOption));

app.use(express.static("public"));
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes

app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
