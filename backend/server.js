require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/articleRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"));

app.use("/api/articles", routes);

app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);
