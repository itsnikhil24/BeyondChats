import { useEffect, useState } from "react";
import { scrapeArticles, getArticles } from "./api/articlesApi";
import Header from "./components/Header";
import ActionCard from "./components/ActionCard";
import Tabs from "./components/Tabs";
import ArticleCard from "./components/ArticleCard";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("scraped"); // scraped | published

  // ✅ ONLY fetch from DB
  const loadArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load articles:", err);
    }
  };

  // ✅ Scrape ONLY when user clicks button
  const handleScrape = async () => {
    setLoading(true);
    try {
      await scrapeArticles();
      await loadArticles(); // refresh DB data
    } catch (err) {
      console.error("Scrape failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Page load → fetch only
  useEffect(() => {
    loadArticles();
  }, []);

  // ✅ Filter by status
  const filtered =
  tab === "scraped"
    ? articles // show ALL articles
    : articles.filter(article => article.status === "published");


  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-6">
        <ActionCard loading={loading} onScrape={handleScrape} />

        <Tabs
          originalCount={articles.length}
          rephrasedCount={articles.filter(a => a.status === "published").length}
          tab={tab}
          setTab={setTab}
        />

        {loading && (
          <p className="text-center mt-10 text-gray-400">
            Loading articles...
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center mt-10 text-gray-400">
            No articles found. Click "Scrape Articles" to fetch new ones.
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filtered.map(article => (
            <ArticleCard
              key={article._id}
              article={article}
              onUpdated={setArticles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
