import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import PageLayout from "./components/PageLayout";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks";
import Item from "./pages/Item";
import Shop from "./pages/Shop";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <PageLayout>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/shop" exact>
                <Shop />
              </Route>
              <Route path="/items/:itemId" exact>
                <Item />
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
    </AuthProvider>
  );
}

export default App;
