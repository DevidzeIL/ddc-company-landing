import { useState } from "react";
import { Link } from "wouter";

const casesData = [
  {
    title: "Кейс: Автоматизация банковской отчетности",
    before: "Штат 10 человек, ручной ввод документов, медленная обработка и ошибки",
    after: "Штат 2 человека, OCR/NLP авто-импорт, классификация и снижение затрат",
    image: "/bank.avif",
  },
  {
    title: "Кейс: Финансовая консолидация для фармакологии",
    before: "Разрозненные отчеты, ручная сводка данных, затраты бэк-офиса $50 тыс",
    after: "Единая AI-система, мгновенная аналитика, затраты снижены до $10 тыс",
    image: "/finans.avif",
  },
  {
    title: "Кейс: Разработка технологии транскрибирования аудио",
    before: '"Слепой" аудиоконтент, невозможность поиска по смыслу, нет навигации',
    after: "Авто-транскрипция, распознавание спикеров, умный поиск по аудио и рекламе",
    image: "/transcript.avif",
  },
  {
    title: "Кейс: Аналитика данных маркетплейса E-COM",
    before: "Отсутствие детальной статистики, интуитивный маркетинг, отток клиентов",
    after: "Сквозная аналитика (как WB), рост удержания на 62%, точные метрики продаж",
    image: "/analytic.avif",
  },
  {
    title: "Кейс: Разработка системы умной парковки",
    before: "Охранники на шлагбауме, ручной контроль оплаты, расходы на персонал",
    after: "Распознавание номеров, авто-оплата через паркомат, контроль без людей",
    image: "/parking.avif",
  },
];

export function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % casesData.length);
  };

  const c = casesData[currentIndex];

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
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Было</span>
              <p className="font-mono text-sm md:text-base text-white/80 mt-2 leading-relaxed">{c.before}</p>
            </div>

            <div className="mb-6 md:mb-10">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Стало</span>
              <p className="font-mono text-sm md:text-base text-white/80 mt-2 leading-relaxed">{c.after}</p>
            </div>

            <button
              onClick={next}
              className="font-mono text-sm text-white border border-white/20 px-6 py-3 hover:bg-white/5 transition-colors inline-block"
            >
              Листай →
            </button>
          </div>

          {/* Right: image */}
          <div className="flex-1">
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-[200px] md:h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-6 md:mt-8 justify-center">
          {casesData.map((_, i) => (
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
            href="/cases"
            className="font-mono text-base md:text-lg font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 px-10 md:px-14 py-4 md:py-5 transition-colors inline-flex items-center gap-3 shadow-lg shadow-red-900/40"
          >
            больше кейсов
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
