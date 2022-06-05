import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button, TabContent } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as CartSvg } from "../assets/cart.svg";
import { computeTimeLeft } from "../utils/itemUtils";
import { fetchItemByUserToken } from "../utils/userUtils";
import ItemList from "../components/myItems/ItemList";
import My_Profile from "./My_Profile";
import User_items from "./User_items";
import Breadcrumb from "./Breadcrumb";

function Profile({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(1);
  const [mainPage, setMainPage] = useState("Profile");
  const [subPage, setSubPage] = useState("My Account -> Profile");
  const [breadCrumb, setBreadCrum] = useState(<Breadcrumb mainPage="Profile" subPage ="My Account -> Profile"/>);
  const [tebContent, setTabContent] = useState(null);

  const setBreadCrumb = (page) => {
    if (page === "Profile") {
      setBreadCrum(<Breadcrumb mainPage="Profile" subPage ="My Account -> Profile" />);
    } else if (page==="Items") {
      setBreadCrum(<Breadcrumb mainPage="Items" subPage ="My Account -> My items" />);
    }
  }

  return (
    <div>
      <div className={classes.page_heading}>
        {breadCrumb}
      </div>
      <LayoutContainer>
        <div className={classes.btn_container}>
          {selectedTab === 1 ? (
            <div>
              <button
                className={`${classes.section_button} ${classes.selected_section_button}`}
              >
                Profile
              </button>
            </div>
          ) : (
            <button
              onClick={() => {setSelectedTab(1); setBreadCrumb("Profile");}}
              className={classes.section_button}
            >
              Profile
            </button>
          )}
          {selectedTab === 2 ? (
            <button
              className={`${classes.section_button} ${classes.selected_section_button}`}
            >
              Seller
            </button>
          ) : (
            <button
              onClick={() => {setSelectedTab(2); setBreadCrumb("Items");}}
              className={classes.section_button}
            >
              Seller
            </button>
          )}
        </div>
        {selectedTab === 1 && <My_Profile />}
        {selectedTab === 2 && <User_items />}
      </LayoutContainer>
    </div>
  );
}

export default Profile;
