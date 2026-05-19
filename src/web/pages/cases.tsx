import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CookieBanner } from "../components/cookie-banner";
import casesData from "../data/cases.json";

type CaseItem = {
  id: number;
  category: string;
  project_number: number | string;
  title: string;
  description: string;
};

const allCases = casesData as CaseItem[];

export default function CasesPage() {
  const [selected, setSelected] = useState<CaseItem | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, CaseItem[]>();
    for (const c of allCases) {
      const key = c.category || "Прочее";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], "ru")
    );
  }, []);

  function toggleCategory(cat: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  // закрывать по Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // блокировать скролл под модалкой
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <div className="dark-textured-bg min-h-screen text-white">
      <Header />

      <section className="px-6 pt-6 md:pt-12 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-white/50 hover:text-white transition-colors mb-6 md:mb-10"
          >
            <span>←</span>
            <span>На главную</span>
          </Link>

          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 md:mb-4">
            Все кейсы DDC
          </h1>
          <p className="font-mono text-base md:text-xl text-white/60">
            Cases · {allCases.length} проектов
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-14">
          {grouped.map(([category, items]) => {
            const isCollapsed = collapsed.has(category);
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center gap-3 mb-5 md:mb-6 w-full group cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm uppercase tracking-wider group-hover:border-white/25 group-hover:text-white/90 transition-colors">
                    <span
                      className="transition-transform duration-200"
                      style={{ display: "inline-block", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                    {category}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    {items.length}
                  </span>
                  <div className="flex-1 h-px bg-white/10 group-hover:bg-white/20 transition-colors" />
                </button>

                {!isCollapsed && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                    {items.map((c) => (
                      <CaseCard key={c.id} item={c} onClick={() => setSelected(c)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
      <CookieBanner />

      {selected && (
        <CaseModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function CaseCard({
  item,
  onClick,
}: {
  item: CaseItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col justify-between text-left bg-[#222]/70 border border-white/5 rounded-md p-4 md:p-5 min-h-[170px] md:min-h-[190px] hover:bg-[#2a2a2a] hover:border-white/20 transition-colors w-full cursor-pointer"
    >
      <h3 className="font-mono text-sm md:text-[15px] font-semibold text-white leading-snug line-clamp-4">
        {item.title}
      </h3>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="inline-block font-mono text-[9px] md:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm uppercase tracking-wider">
          {item.category}
        </span>
        <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors">
          читать →
        </span>
      </div>
    </button>
  );
}

function CaseModal({
  item,
  onClose,
}: {
  item: CaseItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* panel */}
      <div
        className="relative z-10 w-full max-w-xl bg-[#1e1e1e] border border-white/10 rounded-md p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <span className="inline-block font-mono text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm uppercase tracking-wider">
            {item.category}
          </span>
          {item.project_number !== "" && (
            <span className="font-mono text-[10px] text-white/30">
              #{item.project_number}
            </span>
          )}
        </div>

        <h2 className="font-mono text-base md:text-xl font-bold text-white leading-snug mb-5">
          {item.title}
        </h2>

        {item.description ? (
          <p className="font-mono text-sm text-white/70 leading-relaxed">
            {item.description}
          </p>
        ) : (
          <p className="font-mono text-sm text-white/30 italic">
            Описание не добавлено
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-8 font-mono text-xs text-white/50 border border-white/10 px-4 py-2.5 hover:bg-white/5 hover:text-white transition-colors"
        >
          закрыть ✕
        </button>
      </div>
    </div>
  );
}
