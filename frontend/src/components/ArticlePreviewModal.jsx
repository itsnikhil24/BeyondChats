
export default function ArticlePreviewModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#0b0f19] w-full max-w-6xl h-[85vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-white/10 bg-[#0f1624]">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Article Comparison
            </h2>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1 max-w-2xl">
              {article.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Columns */}
        <div className="flex flex-1 overflow-hidden divide-x divide-white/10">

          {/* Original Column */}
          <div className="w-1/2 flex flex-col bg-[#0f1624]/50">
            <div className="px-8 py-4 border-b border-white/5 bg-white/5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Source Content
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
               <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                  <p className="whitespace-pre-line leading-7">
                    {article.content}
                  </p>
               </div>
            </div>
          </div>

          {/* Rephrased Column */}
          <div className="w-1/2 flex flex-col bg-indigo-900/5">
            <div className="px-8 py-4 border-b border-white/5 bg-indigo-500/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                AI Enhanced
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {article.rewrittenContent ? (
                 <div className="prose prose-invert prose-sm max-w-none text-slate-200">
                    <p className="whitespace-pre-line leading-7">
                      {article.rewrittenContent}
                    </p>
                 </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                   <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                   </svg>
                   <p className="italic">No rephrased version available yet.</p>
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
                          className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-2 truncate"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
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