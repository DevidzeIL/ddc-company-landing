import { useT } from "../i18n/context";

export function Process() {
  const t = useT();

  return (
    <section className="py-12 md:py-20 px-6" aria-labelledby="process-heading">
      <div className="max-w-[1200px] mx-auto">
        <h2 id="process-heading" className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {t.process.heading}
        </h2>
        <p className="font-mono text-sm md:text-lg text-white/60 mb-10 md:mb-16">
          {t.process.subtitle}
        </p>

        <ol className="flex flex-col items-center gap-0 list-none">
          {t.process.steps.map((step, i) => (
            <li key={i} className="flex flex-col items-center w-full">
              <div className="border border-dashed border-white/20 p-6 md:p-14 w-full max-w-[700px] text-center relative">
                <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 font-mono text-xs text-black bg-white px-4 py-1 font-bold" aria-hidden="true">
                  {step.num}
                </span>
                <h3 className="font-mono text-lg md:text-2xl font-bold text-white">
                  {step.title}
                </h3>
              </div>
              {i < t.process.steps.length - 1 && (
                <div className="py-2 md:py-3 text-white/30" aria-hidden="true">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M10 4v16M6 16l4 4 4-4" />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
