import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as CartSvg } from "../assets/cart.svg";
import { computeTimeLeft } from "../utils/itemUtils";
import { fetchItemByUserToken } from "../utils/userUtils";

function User_items({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  
  const [selectedTab, setSelectedTab] = useState(1);
  const [items, setItems] = useState([]);
  const [noActiveItems, setNoActiveItems] = useState(null);
  const [noFinishedItems, setNoFinishedItems] = useState(null);

  useEffect(async () => {
    // const history = browserHistory();
    // if (token === null) {
    //   history.push("/login");
    //   window.location.reload(false);
    // }
    setItems(await fetchItemByUserToken(token));
    setNoActiveItems(items.filter(item => {return computeTimeLeft(new Date(item.auctionEndDate))!==0}));
    setNoFinishedItems(items.filter(item => {return computeTimeLeft(new Date(item.auctionEndDate))===0}));
  }, [token]);

  const getHighestBid = (item) => {
    if (item.bids.length > 0) {
      const amounts = item.bids.map((bid) => bid.amount);
      return Math.max(amounts);
    } else return item.startingPrice;
  }

  function getImage( image ) {
    const imagesArr = image
      ? image.split(";").filter((el) => el.length !== 0)
      : [];

      console.log(imagesArr)
      if(imagesArr){
        return imagesArr[0];
      }
      return null;
  }

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
        <div className={classes.required_container}>
          <div className={classes.section_heading}>
            <Row className={classes.header_row}>
              <Col>Item</Col>
              <Col>Name</Col>
              <Col>Time Left</Col>
              <Col>Starting Price</Col>
              <Col>No. Bids</Col>
              <Col>Highest Bid</Col>
              <Col></Col>
            </Row>
          </div>
          {items && items.length> 0 && selectedTab === 1 ? (
            <div>
            {noActiveItems && noActiveItems.length > 0 ? (
              
            items.filter(item => {return computeTimeLeft(new Date(item.auctionEndDate))!==0}).map((item) => (
              <Row>
              <Col><img src={getImage(item.photo)}/></Col>
              <Col>{item.name}</Col>
              <Col>{computeTimeLeft(new Date(item.auctionEndDate))}</Col>
              <Col>{item.startingPrice}</Col>
              <Col>{item.bids.length}</Col>
              <Col>{getHighestBid(item)}</Col>
              <Col></Col>
            </Row>
            ))
            ) : (
              <div className={classes.required_section}>
              <CartSvg className={classes.cart_logo} />
              <p className={classes.cart_subheading}>
                You do not have any scheduled items for sale
              </p>
              <Button className={classes.sell_button} variant="outline-*">
                START SELLING
              </Button>
            </div>
            )}
            </div>
          ) : (
            null
          )}
          {items && items.length> 0 && selectedTab === 2 ? (
                        <div>
            {noActiveItems && noActiveItems.length > 0 ? (
              
            items.filter(item => {return computeTimeLeft(new Date(item.auctionEndDate))===0}).map((item) => (
              <Row>
              <Col><img src={getImage(item.photo)}/></Col>
              <Col>{item.name}</Col>
              <Col>{computeTimeLeft(new Date(item.auctionEndDate))}</Col>
              <Col>{item.startingPrice}</Col>
              <Col>{item.bids.length}</Col>
              <Col>{getHighestBid(item)}</Col>
              <Col></Col>
            </Row>
            ))
            ) : (
              <div className={classes.required_section}>
              <CartSvg className={classes.cart_logo} />
              <p className={classes.cart_subheading}>
                You do not have any scheduled items for sale
              </p>
              <Button className={classes.sell_button} variant="outline-*">
                START SELLING
              </Button>
            </div>
            )}
            </div>

          ) : (
            null
          )}
        </div>
      </LayoutContainer>
    </div>
  );
}

export default User_items;
