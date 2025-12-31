import { useEffect, useState } from "react";
import { scrapeArticles, getArticles } from "./api/articlesApi";
import Header from "./components/Header";
import ActionCard from "./components/ActionCard";
import Tabs from "./components/Tabs";
import ArticleCard from "./components/ArticleCard";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // page load
  const [scraping, setScraping] = useState(false); // button action
  const [tab, setTab] = useState("scraped"); // scraped | published

  // ✅ Fetch from DB only
  const loadArticles = async () => {
    try {
      const res = await getArticles();

      // 🔥 Normalize response
      const list =
        Array.isArray(res) ? res :
        Array.isArray(res?.articles) ? res.articles :
        [];

      setArticles(list);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  // ✅ Scrape on button click only
  const handleScrape = async () => {
    try {
      setScraping(true);
      await scrapeArticles();
      await loadArticles(); // re-fetch after scraping
    } catch (err) {
      console.error("Scrape failed:", err);
    } finally {
      setScraping(false);
    }
  };

  // ✅ Page load → check DB
  useEffect(() => {
    loadArticles();
  }, []);

  // ✅ Tabs logic
  const filtered =
    tab === "scraped"
      ? articles
      : articles.filter(a => a.status === "published");

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-6">
        <ActionCard loading={scraping} onScrape={handleScrape} />

        <Tabs
          originalCount={articles.length}
          rephrasedCount={articles.filter(a => a.status === "published").length}
          tab={tab}
          setTab={setTab}
        />

        {/* Initial DB check */}
        {initialLoading && (
          <p className="text-center mt-10 text-gray-400">
            Checking existing articles...
          </p>
        )}

        {/* Empty DB */}
        {!initialLoading && articles.length === 0 && (
          <p className="text-center mt-10 text-gray-400">
            No articles found. Click <b>Start Scraping</b> to fetch articles.
          </p>
        )}

        {/* Articles */}
        {!initialLoading && filtered.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {filtered.map(article => (
              <ArticleCard
                key={article._id}
                article={article}
                onUpdated={setArticles}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
