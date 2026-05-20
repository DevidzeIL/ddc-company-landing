import { useT } from "../i18n/context";

export function Hero() {
  const t = useT();

  return (
    <section className="pt-10 md:pt-16 pb-8 px-6" aria-labelledby="hero-heading">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 mb-6 md:mb-10">
            <div className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg" className="md:w-7 md:h-7" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-mono text-xs md:text-sm text-white/70">{t.hero.rating}</span>
          </div>

          <h1 id="hero-heading" className="font-mono text-[1.75rem] md:text-4xl lg:text-[2.8rem] font-bold leading-[1.2] mb-5 md:mb-8 tracking-tight">
            {t.hero.heading1}
            {" "}
            {t.hero.heading2}
          </h1>

          <p className="font-mono text-base md:text-xl text-white/80 mb-8 md:mb-12 leading-relaxed">
            {t.hero.subtitle1}
            {" "}
            {t.hero.subtitle2}
          </p>

          <a
            href="#contact"
            className="relative inline-block border-2 border-[#FF4444] text-white px-10 md:px-12 py-3.5 md:py-4 font-mono text-sm hover:bg-[#FF4444]/10 transition-colors"
          >
            <span className="absolute -top-2.5 -right-4 text-[#FF4444] text-xs font-mono bg-[#1c1c1c] px-1" aria-hidden="true">
              0.45
            </span>
            {t.hero.cta}
          </a>
        </div>

        <div className="hidden lg:flex flex-1 justify-end pt-4" aria-hidden="true">
          <img
            src="/robo.png"
            alt=""
            role="presentation"
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
