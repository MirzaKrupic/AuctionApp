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

function User_items({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(1);
  const [tebContent, setTabContent] = useState(null);

  useEffect(async () => {
    setTabContent(<My_Profile />);


  }, []);


  return (
    <div>
      <div className={classes.page_heading}>
        <LayoutContainer>
          <div className={classes.page_heading}>
            <p>Bids</p>
            <p>My Account -> Profile</p>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer>
        <div className={classes.btn_container}>
          {selectedTab === 1 ? (
            <div>
              <button
                className={`${classes.section_button} ${classes.selected_section_button}`}
              >
                Active
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSelectedTab(1)}
              className={classes.section_button}
            >
              Active
            </button>
          )}
          {selectedTab === 2 ? (
            <button
              className={`${classes.section_button} ${classes.selected_section_button}`}
            >
              Sold
            </button>
          ) : (
            <button
              onClick={() => setSelectedTab(2)}
              className={classes.section_button}
            >
              Sold
            </button>
          )}
        </div>
        {tebContent}
      </LayoutContainer>
    </div>
  );
}

export default User_items;
