require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/articleRoutes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"));

app.use("/api/articles", routes);

app.listen(process.env.PORT , () =>
  console.log("🚀 Server running on port 3000")
);

