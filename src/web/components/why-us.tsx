import { useState, useEffect, useRef } from "react";
import { useT } from "../i18n/context";

export function WhyUs() {
  const t = useT();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef<number | null>(null);

  useEffect(() => {
    const speed = 0.2;
    const animate = () => {
      setRotation((prev) => prev + speed);
      rotationRef.current = requestAnimationFrame(animate);
    };
    rotationRef.current = requestAnimationFrame(animate);
    return () => {
      if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
    };
  }, []);

  const radius = 170;
  const mobileRadius = 120;
  const angleStep = 360 / t.whyUs.services.length;

  return (
    <section className="py-12 md:py-20 px-6" aria-labelledby="why-us-heading">
      <div className="max-w-[1200px] mx-auto">
        <h2 id="why-us-heading" className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {t.whyUs.heading}
        </h2>
        <p className="font-mono text-sm md:text-lg text-white/60 mb-10 md:mb-16">
          {t.whyUs.subtitle}
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* 3D Drum Carousel — purely visual, hidden from AT */}
          <div
            className="w-full lg:flex-1 flex items-center justify-center overflow-hidden"
            style={{ perspective: "1000px", height: 300 }}
            aria-hidden="true"
          >
            {/* Mobile */}
            <div
              className="relative w-[65%] md:w-[55%] lg:w-[60%] max-w-[300px] block md:hidden"
              style={{
                height: `${mobileRadius * 2}px`,
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation}deg)`,
              }}
            >
              {t.whyUs.services.map((s, i) => {
                const angle = i * angleStep;
                const normalizedAngle = (((angle + rotation) % 360) + 360) % 360;
                const isBackSide = normalizedAngle > 90 && normalizedAngle < 270;
                const brightness = isBackSide ? 0.6 : 1;

                return (
                  <div
                    key={i}
                    className="absolute left-0 w-full flex flex-col justify-center gap-1 rounded-lg px-3 py-2 transition-colors duration-300"
                    style={{
                      top: "50%",
                      transform: `translateY(-50%) rotateX(${angle}deg) translateZ(${mobileRadius}px)`,
                      background: "#F5F5F5",
                      filter: `brightness(${brightness})`,
                      minHeight: 50,
                    }}
                  >
                    <span className="font-mono text-[11px] font-semibold text-[#1a1a1a] tracking-tight leading-snug">
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Desktop */}
            <div
              className="relative w-[55%] lg:w-[60%] max-w-[300px] hidden md:block"
              style={{
                height: `${radius * 2}px`,
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation}deg)`,
              }}
            >
              {t.whyUs.services.map((s, i) => {
                const angle = i * angleStep;
                const normalizedAngle = (((angle + rotation) % 360) + 360) % 360;
                const isBackSide = normalizedAngle > 90 && normalizedAngle < 270;
                const brightness = isBackSide ? 0.6 : 1;

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="absolute left-0 w-full flex flex-col justify-center gap-1 rounded-lg cursor-pointer px-5 py-3 transition-colors duration-300"
                    style={{
                      top: "50%",
                      transform: `translateY(-50%) rotateX(${angle}deg) translateZ(${radius}px)`,
                      background: hoveredCard === i ? "#FF0000" : "#F5F5F5",
                      filter: `brightness(${brightness})`,
                      minHeight: 70,
                    }}
                  >
                    <span className="font-mono text-sm font-semibold text-[#1a1a1a] tracking-tight leading-snug">
                      {s.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#1a1a1a]/60 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      {s.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Screen-reader accessible list of services */}
          <ul className="sr-only">
            {t.whyUs.services.map((s, i) => (
              <li key={i}><strong>{s.title}</strong>: {s.desc}</li>
            ))}
          </ul>

          {/* About text */}
          <div id="about" className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              {t.whyUs.about1}{" "}
              <span className="text-[#FF4444]">{t.whyUs.about1accent}</span>
              {t.whyUs.about1end}
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              {t.whyUs.about2}
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              {t.whyUs.about3start}{" "}
              <em>{t.whyUs.about3em}</em>{" "}
              {t.whyUs.about3mid}{" "}
              <span className="text-[#FF4444]">{t.whyUs.about3accent}</span>{" "}
              {t.whyUs.about3end}
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              {t.whyUs.about4start}{" "}
              <span className="text-[#FF4444]">{t.whyUs.about4accent1}</span>{" "}
              {t.whyUs.about4mid}{" "}
              <span className="text-[#FF4444]">{t.whyUs.about4accent2}</span>
              {t.whyUs.about4end}
            </p>
          </div>
        </div>

        {/* Stats */}
        <dl className="flex flex-wrap justify-center gap-10 md:gap-16 mt-12 md:mt-16">
          <div className="text-center">
            <dt className="font-mono text-xs md:text-sm text-white/50 mt-2 order-2">{t.whyUs.yearsLabel}</dt>
            <dd className="font-mono text-4xl md:text-6xl font-bold text-white order-1">8+</dd>
          </div>
          <div className="text-center">
            <dt className="font-mono text-xs md:text-sm text-white/50 mt-2 order-2">{t.whyUs.projectsLabel}</dt>
            <dd className="font-mono text-4xl md:text-6xl font-bold text-white order-1">200+</dd>
          </div>
          <div className="text-center">
            <dt className="font-mono text-xs md:text-sm text-white/50 mt-2 order-2">{t.whyUs.teamLabel}</dt>
            <dd className="font-mono text-4xl md:text-6xl font-bold text-white order-1">62</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
