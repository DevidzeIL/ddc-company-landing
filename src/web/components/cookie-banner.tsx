import { useState, useEffect } from "react";
import { useT, useLocale } from "../i18n/context";

export function CookieBanner() {
  const t = useT();
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const bannerId = "cookie-banner-desc";
  const bannerLabel = locale === "de" ? "Cookie-Einstellungen" : "Настройки cookies";

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-accepted", "true");
    setVisible(false);
  };

  const onlyNecessary = () => {
    localStorage.setItem("cookie-accepted", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={bannerLabel}
      aria-describedby={bannerId}
      className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto z-50 bg-white text-[#1a1a1a] md:max-w-[400px] p-4 md:p-5 shadow-2xl md:rounded-lg"
    >
      <p id={bannerId} className="font-mono text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
        {t.cookie.text}{" "}
        <a href="/docs/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="text-[#2196F3] underline">
          {t.cookie.policy}
        </a>
        .
      </p>
      <div className="flex gap-3">
        <button
          onClick={onlyNecessary}
          className="font-mono text-xs border border-[#1a1a1a]/30 px-4 py-2 hover:bg-[#1a1a1a]/5 transition-colors rounded flex-1 md:flex-none"
        >
          {t.cookie.necessary}
        </button>
        <button
          onClick={accept}
          className="font-mono text-xs bg-[#1a1a1a] text-white px-4 py-2 hover:bg-[#333] transition-colors rounded flex-1 md:flex-none"
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}
