import { Route, Switch } from "wouter";
import Index from "./pages/index";
import CasesPage from "./pages/cases";
import { Provider } from "./components/provider";
import { LocaleContext } from "./i18n/context";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/cases" component={CasesPage} />
        <Route path="/de">
          <LocaleContext.Provider value="de">
            <Index />
          </LocaleContext.Provider>
        </Route>
        <Route path="/de/cases">
          <LocaleContext.Provider value="de">
            <CasesPage />
          </LocaleContext.Provider>
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
