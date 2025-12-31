export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f1624]/80 backdrop-blur-xl supports-backdrop-filter:bg-[#0f1624]/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          {/* Logo Icon Box */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-indigo-500/30 blur opacity-30"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Article<span className="text-indigo-400">Genie</span> AI
            </h1>
            <p className="text-xs font-medium text-slate-400">
              Intelligent Content Rephrasing & Publishing
            </p>
          </div>
        </div>

        {/* Right: Status / Decorative Badge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-8 px-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </div>
        </div>

      </div>
    </header>
  );
}