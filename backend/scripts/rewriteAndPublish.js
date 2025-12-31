require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("../models/Article");
const processArticle = require("../services/articleRewriteService");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const articles = await Article.find({ status: "scraped" });

  for (const article of articles) {
    const updated = await processArticle(article);

    await Article.findByIdAndUpdate(article._id, updated);
  }

  process.exit(0);
})();
