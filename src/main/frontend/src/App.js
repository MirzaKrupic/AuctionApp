import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import PageLayout from "./components/PageLayout";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageLayout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/registration" exact>
              <Registration />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
          </Switch>
        </PageLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
