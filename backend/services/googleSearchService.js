const { getJson } = require("serpapi");

async function searchGoogle(query) {
  const res = await getJson({
    engine: "google",
    q: query,
    api_key: process.env.SERP_API_KEY,
    num: 10, // fetch more to filter better
  });

  if (!res.organic_results) return [];

  return res.organic_results
    .filter(r => {
      const link = r.link?.toLowerCase() || "";

      // ❌ exclude beyondchats
      if (link.includes("beyondchats")) return false;

      return (
        link.includes("blog") ||
        link.includes("article") ||
        link.includes("medium.com") ||
        link.includes("dev.to") ||
        link.includes("substack.com")
      );
    })
    .slice(0, 2)
    .map(r => r.link);
}

module.exports = { searchGoogle };
