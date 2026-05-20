import { Route, Switch } from "wouter";
import { useEffect } from "react";
import Index from "./pages/index";
import CasesPage from "./pages/cases";
import { Provider } from "./components/provider";
import { LocaleContext } from "./i18n/context";
import type { Locale } from "./i18n/translations";

function LocaleSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "de"
      ? "DDC — Technologielösungen für Ihr Unternehmen"
      : "DDC — Решаем задачи бизнеса с помощью технологий";
  }, [locale]);
  return null;
}

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/">
          <LocaleSetter locale="ru" />
          <Index />
        </Route>
        <Route path="/cases">
          <LocaleSetter locale="ru" />
          <CasesPage />
        </Route>
        <Route path="/de">
          <LocaleContext.Provider value="de">
            <LocaleSetter locale="de" />
            <Index />
          </LocaleContext.Provider>
        </Route>
        <Route path="/de/cases">
          <LocaleContext.Provider value="de">
            <LocaleSetter locale="de" />
            <CasesPage />
          </LocaleContext.Provider>
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
