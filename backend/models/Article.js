const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    url: { type: String, unique: true },
    content: String,               // original content
    rewrittenContent: String,      // LLM output
    references: [String],
    status: {
      type: String,
      enum: ["scraped", "published"],
      default: "scraped",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
