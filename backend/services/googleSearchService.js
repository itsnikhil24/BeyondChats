const { getJson } = require("serpapi");

async function searchGoogle(query) {
  const res = await getJson({
    engine: "google",
    q: query,
    api_key: process.env.SERP_API_KEY,
    num: 5,
  });

  return res.organic_results
    .filter(r => r.link.includes("blog") || r.link.includes("article"))
    .slice(0, 2)
    .map(r => r.link);
}

module.exports = { searchGoogle };
