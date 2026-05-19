import { Route, Switch } from "wouter";
import Index from "./pages/index";
import CasesPage from "./pages/cases";
import { Provider } from "./components/provider";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/cases" component={CasesPage} />
      </Switch>
    </Provider>
  );
}

export default App;
