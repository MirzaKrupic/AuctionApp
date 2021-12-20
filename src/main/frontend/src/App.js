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
import { useEffect, useState } from "react";
import {PAGES} from "./utils/constants"

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <PageLayout currentPage={currentPage}>
            <Switch>
              <Route path="/" exact>
                <Home setCurrentPage={setCurrentPage} />
              </Route>
              <Route path="/shop/:categoryId?" exact>
                <Shop setCurrentPage={setCurrentPage} />
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
