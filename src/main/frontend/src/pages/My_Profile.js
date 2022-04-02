import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState } from "react";
import classes from "./My_Profile.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";

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

  return (
    <div>
      <div className={classes.page_heading}>
        <LayoutContainer>
          <div className={classes.page_heading}>
            <p>Profile</p>
            <p>My Account -> Profile</p>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer>
        <div className={classes.required_container}>
          <div className={classes.section_heading}>
            <p>Required</p>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}

export default My_Profile;
