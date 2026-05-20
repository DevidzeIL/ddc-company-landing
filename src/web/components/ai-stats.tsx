import { useT } from "../i18n/context";

export function AIStats() {
  const t = useT();

  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {t.aiStats.heading1}
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          {t.aiStats.heading2}
        </h2>
        <p className="font-mono text-base md:text-lg text-white/60 mb-12 md:mb-20">
          {t.aiStats.subtitle}
        </p>

        <div className="space-y-10 md:space-y-16">
          {t.aiStats.stats.map((s, i) => (
            <div key={i} className="border-t border-white/10 pt-6 md:pt-8">
              <div className="flex items-start gap-4 md:gap-12">
                <span className="font-mono text-5xl md:text-8xl font-bold text-white/[0.07] leading-none flex-shrink-0 w-[50px] md:w-[120px]">
                  {i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm md:text-lg text-white/90 leading-relaxed">
                    {s.text}
                  </p>
                  <div className="mt-3 md:hidden">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                      {s.sources.length > 1 ? t.aiStats.sources : t.aiStats.source}{" "}
                    </span>
                    {s.sources.map((src, j) => (
                      <span key={j} className="font-mono text-[10px] text-white/60 underline decoration-white/30">
                        {src}{j < s.sources.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right hidden md:block">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider block mb-1">
                    {s.sources.length > 1 ? t.aiStats.sources : t.aiStats.source}
                  </span>
                  {s.sources.map((src, j) => (
                    <span key={j} className="font-mono text-xs text-white/60 underline decoration-white/30 block">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
