import { useState } from "react";
import { useT, useLocale } from "../i18n/context";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useT();
  const locale = useLocale();
  const base = locale === "de" ? "/de" : "";

  return (
    <header className="relative z-50">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <a href={base || "/"}>
          <img src="/logo-ddc.avif" alt="DDC" className="h-[22px] object-contain" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a href={`${base}/#case`} className="text-white/80 hover:text-white transition-colors">{t.nav.cases}</a>
          <a href={`${base}/#about`} className="text-white/80 hover:text-white transition-colors">{t.nav.about}</a>
          <a href={`${base}/#contact`} className="text-white/80 hover:text-white transition-colors">{t.nav.contacts}</a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 px-6 py-4 font-mono text-sm">
          <a href={`${base}/#case`} className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>{t.nav.cases}</a>
          <a href={`${base}/#about`} className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
          <a href={`${base}/#contact`} className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>{t.nav.contacts}</a>
        </div>
      )}
    </header>
  );
}
