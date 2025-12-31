// services/llmService.js
const { GoogleGenAI } = require("@google/genai");

// API key is automatically picked from process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function rewriteArticle(original, competitors, retry = 0) {
  try {
    const prompt = `
Rewrite the article below using better SEO, formatting, and clarity.
Take inspiration from the competitor articles.

Original Article:
${original}

Competitor Articles:
${competitors.join("\n\n")}

Add a "References" section at the bottom.
`;

    const response = await ai.models.generateContent({
      // ✅ FREE TIER + WORKING MODEL
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (err) {
    // Retry only for temporary rate limits
    if (err.status === 429 && retry < 2) {
      const wait = 2000 * Math.pow(2, retry);
      console.warn(
        `[LLM] Rate limit hit. Retrying in ${wait / 1000}s (Attempt ${retry + 1}/2)`
      );
      await delay(wait);
      return rewriteArticle(original, competitors, retry + 1);
    }

    console.error("Gemini API Error:", err.message || err);
    throw err;
  }
}

module.exports = { rewriteArticle };
