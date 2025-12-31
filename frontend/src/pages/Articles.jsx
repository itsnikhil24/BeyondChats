import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articlesApi";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading articles...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
