import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Marquee } from "../components/marquee";
import { Cases } from "../components/cases";
import { AIStats } from "../components/ai-stats";
import { WhyUs } from "../components/why-us";
import { Process } from "../components/process";
import { ContactForm } from "../components/contact-form";
import { Footer } from "../components/footer";
import { CookieBanner } from "../components/cookie-banner";
import { SkipLink } from "../components/skip-link";

export default function Index() {
  return (
    <div className="dark-textured-bg min-h-screen text-white">
      <SkipLink />
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Cases />
        <Marquee />
        <AIStats />
        <WhyUs />
        <Process />
        <ContactForm />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
