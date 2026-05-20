import { useT, useLocale } from "../i18n/context";

export function Footer() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "de" ? "/de" : "";
  const companyNavLabel = locale === "de" ? "Unternehmensnavigation" : "Навигация по разделам";
  const docsNavLabel = locale === "de" ? "Rechtliche Dokumente" : "Юридические документы";

  return (
    <footer className="py-10 md:py-16 px-6" aria-label={locale === "de" ? "Fußzeile" : "Подвал сайта"}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-10 mb-10">
          <a href={base || "/"} aria-label={locale === "de" ? "DDC — Zur Startseite" : "DDC — На главную"}>
            <img src="/logo-ddc.avif" alt="DDC" className="h-7 object-contain" />
          </a>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 md:gap-24">
            {/* Company */}
            <div>
              <h2 className="font-mono text-sm font-bold text-white mb-4">{t.footer.company}</h2>
              <nav aria-label={companyNavLabel} className="space-y-3">
                <a href={`${base}/#case`} className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.nav.cases}
                </a>
                <a href={`${base}/#about`} className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.nav.about}
                </a>
                <a href={`${base}/#contact`} className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.nav.contacts}
                </a>
              </nav>
            </div>

            {/* Docs */}
            <div>
              <h2 className="font-mono text-sm font-bold text-white mb-4">{t.footer.documents}</h2>
              <nav aria-label={docsNavLabel} className="space-y-3">
                <a href="/docs/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.footer.privacy}
                </a>
                <a href="/docs/confidentiality-policy.html" target="_blank" rel="noopener noreferrer" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.footer.confidentiality}
                </a>
                <a href="/docs/user-agreement.html" target="_blank" rel="noopener noreferrer" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.footer.agreement}
                </a>
                <a href="/docs/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="block font-mono text-sm text-white/50 hover:text-white transition-colors">
                  {t.footer.cookie}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="font-mono text-[10px] md:text-xs text-white/30 space-y-1 pt-8 border-t border-white/5">
          <p>© 2024–2025 ИП Шнайдер Генрих Геннадьевич</p>
          <p>ИНН: 771539555738</p>
          <p>Адрес: 127642, Россия, г. Москва, ул. Сухонская, д. 1А, кв. 136</p>
          <p>Email: <a href="mailto:sales@ddc.company" className="underline hover:text-white/60 transition-colors">sales@ddc.company</a></p>
        </div>
      </div>
    </footer>
  );
}
