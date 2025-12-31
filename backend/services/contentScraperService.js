const axios = require("axios");
const cheerio = require("cheerio");

const client = axios.create({
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120",
  },
});

async function scrapeCompetitor(url) {
  try {
    const { data } = await client.get(url);
    const $ = cheerio.load(data);

    $("script, style, nav, footer, header, aside, noscript").remove();

    let content =
      $("article").text().trim() ||
      $("main").text().trim() ||
      $(".entry-content").text().trim();

    if (!content || content.length < 300) {
      content = $("p")
        .map((_, el) => $(el).text())
        .get()
        .join("\n");
    }

    return content.replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
}

module.exports = { scrapeCompetitor };
