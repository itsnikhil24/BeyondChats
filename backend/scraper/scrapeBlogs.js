const axios = require("axios");
const cheerio = require("cheerio");

const client = axios.create({
  timeout: 20000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    Accept: "text/html",
  },
});

async function scrapeBlogs() {
  const BASE_URL = "https://beyondchats.com/blogs/";

  /* -----------------------------
     1️⃣ Find LAST page number
  ------------------------------*/
  const { data } = await client.get(BASE_URL);
  const $ = cheerio.load(data);

  let lastPage = 1;
  $(".page-numbers").each((_, el) => {
    const n = parseInt($(el).text());
    if (!isNaN(n)) lastPage = Math.max(lastPage, n);
  });

  /* -----------------------------
     2️⃣ Collect 5 OLDEST articles
  ------------------------------*/
  const articles = [];
  let currentPage = lastPage;

  while (articles.length < 5 && currentPage > 0) {
    const pageUrl =
      currentPage === 1
        ? BASE_URL
        : `${BASE_URL}page/${currentPage}/`;

    const pageRes = await client.get(pageUrl);
    const $$ = cheerio.load(pageRes.data);

    const pageArticles = [];

    $$("article").each((_, el) => {
      const title = $$(el)
        .find(".entry-title a")
        .text()
        .trim();

      const url = $$(el)
        .find(".entry-title a")
        .attr("href");

      if (title && url) {
        pageArticles.push({ title, url });
      }
    });

    // Oldest articles are at the bottom of the page
    for (let i = pageArticles.length - 1; i >= 0; i--) {
      if (articles.length >= 5) break;
      articles.push(pageArticles[i]);
    }

    currentPage--;
  }

  /* -----------------------------
     3️⃣ Scrape FULL content
  ------------------------------*/
  for (const article of articles) {
    const res = await client.get(article.url);
    const $$$ = cheerio.load(res.data);

    // remove noise
    $$$("script, style, nav, footer, header, aside, noscript").remove();

    // Elementor main content
    let content = $$$(".elementor-widget-theme-post-content")
      .text()
      .trim();

    // fallback safety
    if (!content || content.length < 500) {
      content = $$$("p")
        .map((_, el) => $(el).text())
        .get()
        .join("\n");
    }

    article.content = content.replace(/\s+/g, " ").trim();
  }

  console.log(`✅ Scraped ${articles.length} oldest articles with full content`);
  return articles;
}

module.exports = scrapeBlogs;
