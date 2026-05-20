import { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CookieBanner } from "../components/cookie-banner";
import casesRu from "../data/cases.json";
import casesDe from "../data/cases.de.json";
import { useT, useLocale } from "../i18n/context";

type CaseItem = {
  id: number;
  category: string;
  project_number: number | string;
  title: string;
  description: string;
};

const allCasesRu = casesRu as CaseItem[];
const allCasesDe = casesDe as CaseItem[];

// Карта project_number -> все категории, в которых он встречается
function buildProjectCategories(cases: CaseItem[]) {
  const map = new Map<string | number, string[]>();
  for (const c of cases) {
    const key = c.project_number !== "" ? c.project_number : `id:${c.id}`;
    if (!map.has(key)) map.set(key, []);
    const cats = map.get(key)!;
    if (!cats.includes(c.category)) cats.push(c.category);
  }
  return map;
}

const projectCategoriesRu = buildProjectCategories(allCasesRu);
const projectCategoriesDe = buildProjectCategories(allCasesDe);

function getCategoriesForItem(item: CaseItem, locale: string): string[] {
  const map = locale === "de" ? projectCategoriesDe : projectCategoriesRu;
  const key = item.project_number !== "" ? item.project_number : `id:${item.id}`;
  return map.get(key) ?? [item.category];
}

const GRADIENTS = [
  "linear-gradient(135deg,#1a1a2e,#16213e)",
  "linear-gradient(135deg,#0f3460,#533483)",
  "linear-gradient(135deg,#1b262c,#0f4c75)",
  "linear-gradient(135deg,#2d2d2d,#4a4a4a)",
  "linear-gradient(135deg,#1a1a1a,#2d4a2d)",
  "linear-gradient(135deg,#2a1a2e,#4a1a3e)",
  "linear-gradient(135deg,#1a2a1a,#2a4a1a)",
  "linear-gradient(135deg,#2e1a1a,#4e2a1a)",
  "linear-gradient(135deg,#1a2a2a,#1a4a4a)",
  "linear-gradient(135deg,#2e2a1a,#4e4a1a)",
];

function getCaseGradient(id: number): string {
  return GRADIENTS[(id - 1) % GRADIENTS.length];
}

const EXTS = [".jpg", ".jpeg", ".png", ".webp"];

// Кэш отдельных URL-проверок: src -> загрузилась ли картинка
const probeCache = new Map<string, boolean>();

function probeImage(src: string): Promise<boolean> {
  if (probeCache.has(src)) return Promise.resolve(probeCache.get(src)!);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => { probeCache.set(src, true); resolve(true); };
    img.onerror = () => { probeCache.set(src, false); resolve(false); };
    img.src = src;
  });
}

// Кэш готовых списков картинок по project_number
const imagesCache = new Map<string, string[]>();

// Ищет все картинки в папке /cases/case-<pn>/:
// пробует 1.jpg/png, 2.jpg/png, ... пока не встретит пустой номер (макс 20)
function useProjectImages(pn: string | number | ""): string[] {
  const key = String(pn);
  const [images, setImages] = useState<string[]>(() => imagesCache.get(key) ?? []);

  useEffect(() => {
    if (pn === "" || pn === undefined || pn === null) {
      setImages([]);
      return;
    }
    // Уже есть в кэше — сразу используем
    if (imagesCache.has(key)) {
      setImages(imagesCache.get(key)!);
      return;
    }

    let cancelled = false;

    (async () => {
      const found: string[] = [];
      const base = `/cases/case-${pn}`;

      for (let i = 1; i <= 20; i++) {
        if (cancelled) return;
        let hit = false;
        for (const ext of EXTS) {
          if (cancelled) return;
          if (await probeImage(`${base}/${i}${ext}`)) {
            found.push(`${base}/${i}${ext}`);
            hit = true;
            break;
          }
        }
        if (!hit) break;
      }

      imagesCache.set(key, found);
      if (!cancelled) setImages(found);
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return images;
}

export default function CasesPage() {
  const t = useT();
  const locale = useLocale();
  const allCases = locale === "de" ? allCasesDe : allCasesRu;
  const homePath = locale === "de" ? "/de" : "/";

  const [selected, setSelected] = useState<CaseItem | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map = new Map<string, CaseItem[]>();
    for (const c of allCases) {
      if (q) {
        const cats = getCategoriesForItem(c, locale).join(" ").toLowerCase();
        const match =
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          cats.includes(q);
        if (!match) continue;
      }
      const key = c.category || (locale === "de" ? "Sonstiges" : "Прочее");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], locale === "de" ? "de" : "ru")
    );
  }, [query, locale, allCases]);

  const totalVisible = useMemo(
    () => grouped.reduce((s, [, items]) => s + items.length, 0),
    [grouped]
  );

  function toggleCategory(cat: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="dark-textured-bg min-h-screen text-white">
      <Header />

      <section className="px-6 pt-6 md:pt-12 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href={homePath}
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-white/50 hover:text-white transition-colors mb-6 md:mb-10"
          >
            <span>←</span>
            <span>{t.casesPage.backHome}</span>
          </Link>

          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 md:mb-4">
            {t.casesPage.title}
          </h1>
          <p className="font-mono text-base md:text-xl text-white/60 mb-6 md:mb-8">
            Cases · {totalVisible} {t.casesPage.countOf} {allCases.length} {t.casesPage.projects}
          </p>

          {/* Поиск */}
          <div className="relative max-w-xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none select-none font-mono text-sm">
              ⌕
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.casesPage.searchPlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-sm font-mono text-sm text-white placeholder-white/30 pl-10 pr-10 py-3 focus:outline-none focus:border-white/30 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors font-mono text-base leading-none"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-14">
          {grouped.length === 0 && (
            <p className="font-mono text-white/40 text-sm py-12 text-center">
              {t.casesPage.noResults} «{query}»
            </p>
          )}
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
                      style={{
                        display: "inline-block",
                        transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                      }}
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
  const t = useT();
  const locale = useLocale();
  const categories = getCategoriesForItem(item, locale);
  const gradient = getCaseGradient(item.id);
  const images = useProjectImages(item.project_number);
  const firstImage = images[0] ?? null;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col text-left bg-[#222]/70 border border-white/5 rounded-md overflow-hidden hover:bg-[#2a2a2a] hover:border-white/20 transition-colors w-full cursor-pointer"
    >
      {/* Превью */}
      <div className="w-full h-28 md:h-32 flex-shrink-0 overflow-hidden relative">
        {firstImage ? (
          <img
            src={firstImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}
        {images.length > 1 && (
          <span className="absolute bottom-1.5 right-1.5 font-mono text-[9px] bg-black/60 text-white/70 px-1.5 py-0.5 rounded-sm">
            {images.length} {t.casesPage.photos}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
        <h3 className="font-mono text-sm md:text-[15px] font-semibold text-white leading-snug line-clamp-3">
          {item.title}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-block font-mono text-[9px] md:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors whitespace-nowrap">
            {t.casesPage.read}
          </span>
        </div>
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
  const t = useT();
  const locale = useLocale();
  const categories = getCategoriesForItem(item, locale);
  const gradient = getCaseGradient(item.id);
  const images = useProjectImages(item.project_number);
  const [idx, setIdx] = useState(0);

  // сбрасывать индекс при смене кейса
  useEffect(() => { setIdx(0); }, [item.id]);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIdx((i) => (i - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIdx((i) => (i + 1) % images.length);
    },
    [images.length]
  );

  const hasImages = images.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-3xl bg-[#1e1e1e] border border-white/10 rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Превью / карусель */}
        <div className="w-full h-64 md:h-96 relative overflow-hidden bg-black/30">
          {hasImages ? (
            <>
              <img
                key={images[idx]}
                src={images[idx]}
                alt={`${item.title} — ${t.casesPage.photo} ${idx + 1}`}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors text-sm"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors text-sm"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === idx ? "bg-white" : "bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full" style={{ background: gradient }} />
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-block font-mono text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
            {item.project_number !== "" && (
              <span className="font-mono text-[10px] text-white/30 whitespace-nowrap">
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
              {t.casesPage.noDesc}
            </p>
          )}

          <button
            onClick={onClose}
            className="mt-8 font-mono text-xs text-white/50 border border-white/10 px-4 py-2.5 hover:bg-white/5 hover:text-white transition-colors"
          >
            {t.casesPage.close}
          </button>
        </div>
      </div>
    </div>
  );
}
