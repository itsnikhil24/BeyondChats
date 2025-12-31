import { formatContent } from "../utils/formatContent";

export default function ArticlePreviewModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#0b0f19] w-full max-w-6xl h-[85vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-white/10 bg-[#0f1624]">
          <div>
            <h2 className="text-xl font-bold text-white">Article Comparison</h2>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1 max-w-2xl">
              {article.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden divide-x divide-white/10">

          {/* Original */}
          <div className="w-1/2 flex flex-col bg-[#0f1624]/50">
            <div className="px-8 py-4 border-b border-white/5 bg-white/5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Source Content
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div
                className="prose prose-invert prose-sm max-w-none text-slate-300 leading-7"
                dangerouslySetInnerHTML={{
                  __html: formatContent(article.content),
                }}
              />
            </div>
          </div>

          {/* Rephrased */}
          <div className="w-1/2 flex flex-col bg-indigo-900/5">
            <div className="px-8 py-4 border-b border-white/5 bg-indigo-500/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                AI Enhanced
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {article.rewrittenContent ? (
                <div
                  className="prose prose-invert prose-sm max-w-none text-slate-200 leading-7"
                  dangerouslySetInnerHTML={{
                    __html: formatContent(article.rewrittenContent),
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 italic">
                  No rephrased version available yet.
                </div>
              )}

              {article.references?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase">
                    References
                  </h4>
                  <ul className="space-y-2">
                    {article.references.map((ref, i) => (
                      <li key={i}>
                        <a
                          href={ref}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400 hover:underline truncate"
                        >
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
