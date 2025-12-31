const { searchGoogle } = require("./googleSearchService");
const { scrapeCompetitor } = require("./contentScraperService");
const { rewriteArticle } = require("./llmService");

async function rewriteAndPublish(article) {
  if (!article.content) {
    throw new Error("Article content missing");
  }

  // 1️⃣ Google search
  const links = await searchGoogle(article.title);

  // 2️⃣ Scrape competitors
  const competitorContent = [];
  for (const link of links) {
    const text = await scrapeCompetitor(link);
    if (text) competitorContent.push(text);
  }

  // 3️⃣ Rewrite
  const rewritten = await rewriteArticle(
    article.content,
    competitorContent
  );

  // 4️⃣ Publish
  article.rewrittenContent = rewritten;
  article.references = links;
  article.status = "published";

  await article.save();
}

module.exports = { rewriteAndPublish };
