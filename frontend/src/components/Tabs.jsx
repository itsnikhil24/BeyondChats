export default function Tabs({
  originalCount,
  rephrasedCount,
  tab,
  setTab,
}) {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-[#111827] border border-white/10 rounded-lg flex">
        <button
          onClick={() => setTab("scraped")}
          className={`px-6 py-2 rounded-lg ${
            tab === "scraped" ? "bg-white/10" : ""
          }`}
        >
          Original ({originalCount})
        </button>

        <button
          onClick={() => setTab("published")}
          className={`px-6 py-2 rounded-lg ${
            tab === "published" ? "bg-white/10" : ""
          }`}
        >
          Rephrased ({rephrasedCount})
        </button>
      </div>
    </div>
  );
}
