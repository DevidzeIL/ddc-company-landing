import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.agreed) {
      setError("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://hook.eu1.make.com/i7j3e71uw2duuojvvle2ei2ip2n8lps9", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          comment: form.message,
        }),
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      // Цель Яндекс.Метрики
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(108497851, "reachGoal", "form_submit");
      }

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "", agreed: false });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-[#2a2a2a] border-0 border-b border-white/10 px-4 py-4 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-[600px] mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          ОСТАЛИСЬ ВОПРОСЫ?
        </h2>
        <p className="font-mono text-base text-white/60 mb-12">
          Оставьте заявку, и мы свяжемся с вами, чтобы рассказать больше
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="font-mono text-sm text-white/80 mb-2 block">
              Имя <span className="text-[#FF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-mono text-sm text-white/80 mb-2 block">
              Телефон <span className="text-[#FF4444]">*</span>
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-mono text-sm text-white/80 mb-2 block">
              Email
            </label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-mono text-sm text-white/80 mb-2 block">
              Опишите вашу задачу <span className="text-[#FF4444]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-y`}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <span
              className={`mt-0.5 w-5 h-5 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors ${
                form.agreed
                  ? "bg-[#7B61FF] border-[#7B61FF]"
                  : "border-white/30 bg-transparent"
              }`}
            >
              {form.agreed && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              className="sr-only"
            />
            <span className="font-mono text-xs text-white/60 leading-relaxed">
              Установка галочки (отправка формы) означает, что я ознакомлен(а) с{" "}
              <a href="/docs/privacy-policy.html" target="_blank" className="underline text-white/80 hover:text-white">
                Политикой обработки персональных данных
              </a>{" "}
              и{" "}
              <a href="/docs/user-agreement.html" target="_blank" className="underline text-white/80 hover:text-white">
                Пользовательским соглашением
              </a>
              , согласен(на) с их условиями и даю своё конкретное, информированное и сознательное согласие на обработку моих персональных данных в указанных целях.
            </span>
          </label>

          {error && (
            <p className="font-mono text-sm text-[#FF4444]">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#3BA6FF] hover:bg-[#2196F3] disabled:opacity-50 text-white font-mono text-base py-4 px-8 transition-colors"
          >
            {sending ? "Отправка..." : submitted ? "Отправлено!" : "Отправить"}
          </button>
        </form>
      </div>
    </section>
  );
}
