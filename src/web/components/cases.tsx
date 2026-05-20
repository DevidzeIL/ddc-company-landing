import { useState } from "react";
import { Link } from "wouter";
import { useT, useLocale } from "../i18n/context";

export function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useT();
  const locale = useLocale();
  const casesPath = locale === "de" ? "/de/cases" : "/cases";

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % t.homeCases.cases.length);
  };

  const c = t.homeCases.cases[currentIndex];
  const images = ["/bank.avif", "/finans.avif", "/transcript.avif", "/analytic.avif", "/parking.avif"];

  return (
    <section id="case" className="py-10 md:py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h3 className="font-mono text-xl md:text-3xl font-bold text-white mb-6 md:mb-10 leading-snug">
              {c.title}
            </h3>

            <div className="mb-6 md:mb-8">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">{t.homeCases.before}</span>
              <p className="font-mono text-sm md:text-base text-white/80 mt-2 leading-relaxed">{c.before}</p>
            </div>

            <div className="mb-6 md:mb-10">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">{t.homeCases.after}</span>
              <p className="font-mono text-sm md:text-base text-white/80 mt-2 leading-relaxed">{c.after}</p>
            </div>

            <button
              onClick={next}
              className="font-mono text-sm text-white border border-white/20 px-6 py-3 hover:bg-white/5 transition-colors inline-block"
            >
              {t.homeCases.next}
            </button>
          </div>

          {/* Right: image */}
          <div className="flex-1">
            <img
              src={images[currentIndex]}
              alt={c.title}
              className="w-full h-[200px] md:h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-6 md:mt-8 justify-center">
          {t.homeCases.cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* More cases CTA */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href={casesPath}
            className="font-mono text-base md:text-lg font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 px-10 md:px-14 py-4 md:py-5 transition-colors inline-flex items-center gap-3 shadow-lg shadow-red-900/40"
          >
            {t.homeCases.more}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
