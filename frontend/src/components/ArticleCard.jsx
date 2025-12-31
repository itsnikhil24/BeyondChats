import { useState } from "react";
import { rewriteArticle, getArticles } from "../api/articlesApi";
import ArticlePreviewModal from "./ArticlePreviewModal";
import { formatContent } from "../utils/formatContent";

export default function ArticleCard({ article, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isRephrased = article.status === "published";

  const handleRewrite = async () => {
    try {
      setLoading(true);
      await rewriteArticle(article._id);
      const updated = await getArticles();
      onUpdated(updated);
    } catch (err) {
      console.error("Rewrite failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <>
      <div className="group relative flex flex-col h-120 rounded-2xl border border-white/10 bg-linear-to-br from-[#0f1624] via-[#131b2e] to-[#0f1624] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 hover:border-white/20">

        {/* Header Badge & Expand Button */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md border ${
              isRephrased
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
            }`}
          >
            {isRephrased ? "✨ Rephrased" : "● Original"}
          </span>

          <button
            onClick={() => setShowPreview(true)}
            className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            title="Expand Preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="mt-16 px-6">
          <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 min-h-14 group-hover:text-indigo-200 transition-colors">
            {article.title}
          </h3>
        </div>

        {/* Content (With HTML Rendering support) */}
        <div className="flex-1 px-6 mt-4 overflow-y-auto custom-scrollbar pr-2">
          <div
            className="prose prose-sm prose-invert max-w-none text-slate-400 font-light prose-p:leading-relaxed prose-strong:text-slate-200 prose-headings:text-slate-200"
            dangerouslySetInnerHTML={{
              __html: formatContent(
                isRephrased ? article.rewrittenContent : article.content
              ),
            }}
          />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 mt-2 border-t border-white/5 bg-black/10 rounded-b-2xl">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-4">
            <span>{isRephrased ? "UPDATED" : "CREATED"}</span>
            <span className="text-slate-400 font-mono">
              {isRephrased
                ? formatDate(article.updatedAt)
                : formatDate(article.createdAt)}
            </span>
          </div>

          {!isRephrased ? (
            <button
              onClick={handleRewrite}
              disabled={loading}
              className="w-full relative overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span>Fetch & Rephrase with AI</span>
                  </>
                )}
              </div>
            </button>
          ) : (
            <div className="w-full py-3 text-center text-xs font-medium text-emerald-400/80 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              Article Successfully Enhanced
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <ArticlePreviewModal
          article={article}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}