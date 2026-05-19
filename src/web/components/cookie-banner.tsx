import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) {
      setVisible(true);
    }
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
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto z-50 bg-white text-[#1a1a1a] md:max-w-[400px] p-4 md:p-5 shadow-2xl md:rounded-lg">
      <p className="font-mono text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
        На сайте используются cookies и Яндекс.Метрика. Согласие на их использование запрашивается явно — до нажатия кнопки «Принять» аналитические cookies не устанавливаются.
        Подробнее в{" "}
        <a href="/docs/cookie-policy.html" target="_blank" className="text-[#2196F3] underline">
          Политике Cookie
        </a>
        .
      </p>
      <div className="flex gap-3">
        <button
          onClick={onlyNecessary}
          className="font-mono text-xs border border-[#1a1a1a]/30 px-4 py-2 hover:bg-[#1a1a1a]/5 transition-colors rounded flex-1 md:flex-none"
        >
          Только необходимые
        </button>
        <button
          onClick={accept}
          className="font-mono text-xs bg-[#1a1a1a] text-white px-4 py-2 hover:bg-[#333] transition-colors rounded flex-1 md:flex-none"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
