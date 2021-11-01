import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import PageLayout from "./components/PageLayout";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageLayout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </PageLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
