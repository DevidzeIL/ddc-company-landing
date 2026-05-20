import { useEffect, useRef, useState } from "react";
import { useT } from "../i18n/context";

export function Marquee() {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useT();

  const logoSrc = "/logo-ddc.avif";
  const gap = 40;

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, []);

  const items = [...Array(20)];

  return (
    <div
      className="w-full bg-[#7B61FF] overflow-hidden relative flex items-center"
      style={{ height: 36 }}
      aria-hidden="true"
      role="presentation"
    >
      <div
        ref={contentRef}
        className="flex items-center whitespace-nowrap"
        style={{
          gap: `${gap}px`,
          animation: contentWidth > 0 ? `marquee-scroll ${contentWidth / 50}s linear infinite` : "none",
        }}
      >
        {items.map((_, i) => (
          <div key={i} className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
            <img
              src={logoSrc}
              alt="DDC"
              className="shrink-0"
              style={{ height: "1.1em", width: "auto" }}
            />
            <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              {t.marquee.text}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
