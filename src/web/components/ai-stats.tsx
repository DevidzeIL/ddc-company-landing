const stats = [
  {
    num: "1",
    text: "91% малых и средних предприятий (МСП) использующих искусственный интеллект сообщают о прямом росте выручки",
    sourceLabel: "ИСТОЧНИК:",
    sources: ["Salesforce, 2024"],
  },
  {
    num: "2",
    text: "ИИ-системы контроля качества обнаруживают 99%+ дефектов — человек пропускает 20–30%",
    sourceLabel: "ИСТОЧНИКИ:",
    sources: ["Sandia, 2015", "UnitX Labs, 2025"],
  },
  {
    num: "3",
    text: "Доказано, что ИИ сокращает расходы на проекты на 10-15% и повышает точность соблюдения сроков на 30%",
    sourceLabel: "ИСТОЧНИК:",
    sources: ["McKinsey, 2024"],
  },
  {
    num: "4",
    text: "Малый бизнес экономит 20+ часов и $500–2000 ежемесячно за счет внедрения ИИ для анализа данных, создания контента и взаимодействия с клиентами",
    sourceLabel: "ИСТОЧНИК:",
    sources: ["Thryv Survey, 2025"],
  },
];

export function AIStats() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          ИИ УЖЕ ПРИНОСИТ ДЕНЬГИ
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          ТЕМ, КТО ЕГО ВНЕДРИЛ
        </h2>
        <p className="font-mono text-base md:text-lg text-white/60 mb-12 md:mb-20">
          Данные из независимых исследований
        </p>

        <div className="space-y-10 md:space-y-16">
          {stats.map((s, i) => (
            <div key={i} className="border-t border-white/10 pt-6 md:pt-8">
              <div className="flex items-start gap-4 md:gap-12">
                {/* Number */}
                <span className="font-mono text-5xl md:text-8xl font-bold text-white/[0.07] leading-none flex-shrink-0 w-[50px] md:w-[120px]">
                  {s.num}
                </span>

                {/* Text + source */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm md:text-lg text-white/90 leading-relaxed">
                    {s.text}
                  </p>
                  {/* Source - shown inline on mobile, right-aligned on desktop */}
                  <div className="mt-3 md:hidden">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                      {s.sourceLabel}{" "}
                    </span>
                    {s.sources.map((src, j) => (
                      <span key={j} className="font-mono text-[10px] text-white/60 underline decoration-white/30">
                        {src}{j < s.sources.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Source - desktop */}
                <div className="flex-shrink-0 text-right hidden md:block">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider block mb-1">
                    {s.sourceLabel}
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
