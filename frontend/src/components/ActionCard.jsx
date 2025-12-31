export default function ActionCard({ loading, onScrape }) {
  return (
    <div className="relative mt-12 mb-12 group">
      
      {/* Background Glow Effect (Behind the card) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

      {/* Main Card Container */}
      <div className="relative bg-[#0f1624] border border-white/10 rounded-2xl p-12 text-center shadow-2xl overflow-hidden">
        
        {/* Decorative background grid/spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Icon Container */}
          <div className="mb-6 relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-indigo-500/20 flex items-center justify-center shadow-inner">
              {loading ? (
                <svg className="w-10 h-10 text-indigo-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              )}
            </div>
            {/* Status dot */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 border-4 border-[#0f1624] rounded-full ${loading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`}></div>
          </div>

          {/* Typography */}
          <h2 className="text-2xl font-bold text-white mb-3">
            {loading ? "Syncing Content..." : "Import New Articles"}
          </h2>
          
          <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            Connect to the <span className="text-indigo-300 font-medium">BeyondChats Blog</span> to fetch and process the 5 oldest articles for AI enhancement.
          </p>

          {/* Main Action Button */}
          <button
            onClick={onScrape}
            disabled={loading}
            className="group/btn relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-[#0f1624] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                Processing Request...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/btn:animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Start Scraping
              </span>
            )}
          </button>

          {/* Bottom helper text */}
          <p className="mt-4 text-xs text-slate-500">
            *This action usually takes 5-10 seconds
          </p>
        </div>
      </div>
    </div>
  );
}