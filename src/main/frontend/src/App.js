import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
