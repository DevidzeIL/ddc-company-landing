export function Footer() {
  return (
    <footer className="py-10 md:py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-10 mb-10">
          {/* Logo */}
          <a href="/">
            <img src="/logo-ddc.avif" alt="DDC" className="h-7 object-contain" />
          </a>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 md:gap-24">
            {/* Company */}
            <div>
              <h4 className="font-mono text-sm font-bold text-white mb-4">Компания</h4>
              <nav className="space-y-3">
                <a href="#case" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Кейсы
                </a>
                <a href="#about" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  О нас
                </a>
                <a href="#contact" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Контакты
                </a>
              </nav>
            </div>

            {/* Docs */}
            <div>
              <h4 className="font-mono text-sm font-bold text-white mb-4">Документы</h4>
              <nav className="space-y-3">
                <a href="/docs/privacy-policy.html" target="_blank" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Политика обработки ПДн
                </a>
                <a href="/docs/confidentiality-policy.html" target="_blank" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
                <a href="/docs/user-agreement.html" target="_blank" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Пользовательское соглашение
                </a>
                <a href="/docs/cookie-policy.html" target="_blank" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  Уведомление о Cookie
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Legal info */}
        <div className="font-mono text-[10px] md:text-xs text-white/30 space-y-1 pt-8 border-t border-white/5">
          <p>© 2024–2025 ИП Шнайдер Генрих Геннадьевич</p>
          <p>ИНН: 771539555738</p>
          <p>Адрес: 127642, Россия, г. Москва, ул. Сухонская, д. 1А, кв. 136</p>
          <p>Email: sales@ddc.company</p>
        </div>
      </div>
    </footer>
  );
}
