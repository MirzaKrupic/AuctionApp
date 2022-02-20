import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState } from "react";
import browserHistory from "history/createBrowserHistory";

function My_Profile({ setCurrentPage }) {
  setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);

  useEffect(async () => {
    console.log(token);
    const history = browserHistory();
    if (token === null) {
      history.push("/login");
      window.location.reload(false);
    }
  }, [token]);

  return <h1>my profile</h1>;
}

export default My_Profile;
