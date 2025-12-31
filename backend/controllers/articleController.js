const Article = require("../models/Article");
const scrapeBlogs = require("../scraper/scrapeBlogs");
const { rewriteAndPublish } = require("../services/articleRewriteService");

exports.scrapeBeyondChats = async (req, res) => {
  const articles = await scrapeBlogs();

  for (const art of articles) {
    await Article.updateOne(
      { url: art.url },
      { $setOnInsert: { ...art, status: "scraped" } },
      { upsert: true }
    );
  }

  res.json({ message: "Scraped & stored articles" });
};


exports.rewriteSingleArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  await rewriteAndPublish(article);

  res.json({
    message: "Article rewritten & published",
    articleId: article._id,
  });
};

exports.getAllArticles = async (req, res) => {
  res.json(await Article.find());
};
