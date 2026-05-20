import { useT } from "../i18n/context";

export function SkipLink() {
  const t = useT();
  const label = t.casesPage.backHome === "Zur Startseite"
    ? "Zum Hauptinhalt springen"
    : "Перейти к основному содержимому";
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
