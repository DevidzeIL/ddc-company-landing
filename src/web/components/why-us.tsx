import { useState, useEffect, useRef } from "react";

const services = [
  { title: "Мобильные и веб-приложения", desc: "Разработка сервисов и экосистем." },
  { title: "Автоматизация бизнес-процессов", desc: "Цифровизация и оптимизация задач." },
  { title: "Системы компьютерного зрения", desc: "Видеоаналитика и распознавание." },
  { title: "Робототехника", desc: "ПО для дронов и автономных систем." },
  { title: "ИИ Боты", desc: "Умные ассистенты и чат-боты." },
  { title: "Голосовые решения", desc: "Распознавание и синтез речи." },
  { title: "Финтех решения", desc: "Финансовая аналитика и управление." },
  { title: "Парсинг данных", desc: "Автоматический сбор данных." },
  { title: "Блокчейн технологии", desc: "Смарт-контракты и децентрализация." },
  { title: "Умные системы безопасности", desc: "Интеллектуальный контроль доступа." },
  { title: "Генерация контента", desc: "Нейросети для создания контента." },
  { title: "Медтех решения", desc: "Цифровые сервисы для медицины." },
];

export function WhyUs() {
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
  const angleStep = 360 / services.length;

  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          ПОЧЕМУ ВЫБИРАЮТ НАС?
        </h2>
        <p className="font-mono text-sm md:text-lg text-white/60 mb-10 md:mb-16">
          Опыт с более чем 20 отраслями, от стартапов до промышленных предприятий
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* 3D Drum Carousel */}
          <div
            className="w-full lg:flex-1 flex items-center justify-center overflow-hidden"
            style={{ perspective: "1000px", height: 300 }}
          >
            {/* Mobile: smaller radius */}
            <div
              className="relative w-[65%] md:w-[55%] lg:w-[60%] max-w-[300px] block md:hidden"
              style={{
                height: `${mobileRadius * 2}px`,
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation}deg)`,
              }}
            >
              {services.map((s, i) => {
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
            {/* Desktop: larger radius */}
            <div
              className="relative w-[55%] lg:w-[60%] max-w-[300px] hidden md:block"
              style={{
                height: `${radius * 2}px`,
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation}deg)`,
              }}
            >
              {services.map((s, i) => {
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

          {/* About text */}
          <div id="about" className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              DDC — российская IT-компания,{" "}
              <span className="text-[#FF4444]">работаем с 2017 года</span>.
              Команда — 62 человека.
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              За это время прошли путь от небольшой студии до подрядчика крупного банка, агрохолдинга
              и фармкорпорации, наши решения работают на нескольких российских заводах.
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              Компанию <em>основал</em> Генрих Шнайдер — магистр робототехники,{" "}
              <span className="text-[#FF4444]">бывший преподаватель МГУ</span>{" "}
              и исследователь в лаборатории компьютерного зрения РАН.
            </p>
            <p className="font-mono text-sm md:text-lg text-white/80 leading-[1.8]">
              Наш подход:{" "}
              <span className="text-[#FF4444]">сначала разобраться</span>{" "}
              в задаче, а{" "}
              <span className="text-[#FF4444]">потом писать код</span>.
              Ведём проекты от анализа до внедрения и продолжаем поддерживать и развивать продукт вместе с клиентом.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-12 md:mt-16">
          <div className="text-center">
            <span className="font-mono text-4xl md:text-6xl font-bold text-white">8+</span>
            <p className="font-mono text-xs md:text-sm text-white/50 mt-2">лет опыта</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-4xl md:text-6xl font-bold text-white">200+</span>
            <p className="font-mono text-xs md:text-sm text-white/50 mt-2">проектов</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-4xl md:text-6xl font-bold text-white">62</span>
            <p className="font-mono text-xs md:text-sm text-white/50 mt-2">сотрудника</p>
          </div>
        </div>
      </div>
    </section>
  );
}
