import classes from "./ItemInfo.module.css";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../hooks";
import { useContext } from "react";
import { itemBid } from "../../utils/itemService";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ItemInfo(props) {
  const { token, isUserLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentNumberOfBids, setCurrentNumberOfBids] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const history = useHistory();

  useEffect(async () => {
    if(props.bids){
      setCurrentNumberOfBids(props.bids.length);
      setCurrentAmount(getHighestBid());

      let endDate = props.auctionEndDate.slice(0, 10).split('-');
      let endTime = props.auctionEndDate.slice(11).split(':');
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2], endTime[0], endTime[1], endTime[2]); 

      setTimeLeft(computeTimeLeft(endDate));
    }
  }, [props.bids]);

  function computeTimeLeft(date) {
    let d1 = date;
    let d2 = new Date();
    let now = new Date();
    if (d2.getTime() < d1.getTime()) {
      d1 = now;
      d2 = date;
    }
    let yd = d1.getYear();
    let yn = d2.getYear();
    let years = yn - yd;
    let md = d1.getMonth();
    let mn = d2.getMonth();
    let months = mn - md;
    if (months < 0) {
      years--;
      months = 12 - md + mn;
    }
    let dd = d1.getDate();
    let dn = d2.getDate();
    let days = dn - dd;
    if (days < 0) {
      months--;
      d2.setMonth(mn, 0);
      days = d2.getDate() - dd + dn;
    }
    let weeks = Math.floor(days / 7);
    days = days % 7;
    if (years > 0) return years + ' years' + (months > 0 ? ' and ' + months + ' months' : ' and ' + weeks + ' weeks');
    if (months > 0) return months + ' months' + (weeks > 0 ? ' and ' + weeks + ' weeks' : ' and ' + days + ' days');
    if (weeks > 0) return weeks + ' weeks' + (days > 0 ? ' and ' + days + ' days' : '');
    return days + ' days';
 }

  const handleSubmit = async (item) => {
    const { amount } = item;
    const { itemId } = props;
    try {
      const itemRes = await itemBid(token, {
        itemId,
        amount: parseFloat(amount),
      });
      setResponse(itemRes.body);
    } catch (e) {
      console.error(e);
    }
  };

  function getHighestBid() {
    return (props.bids.length>0 ? props.bids.reduce((acc, bid) => acc = acc > bid.amount ? acc : bid.amount, 0) : props.startingPrice);
  }

  return (
    <div className={classes.item_info_container}>
      <div className={classes.item_heading}>
        <p className={classes.item_title}>{props.name}</p>
        <p className={classes.item_starting_price}>
          {"Starts from "}
          <span className={classes.starting_price}>${props.startingPrice}</span>
        </p>
      </div>
      <div className={classes.bidding_section}>
        <div className={classes.bidding_info}>
          <p>
            {"Highest Bid: "}
            <span className={classes.detail_value}>{currentAmount}$</span>
          </p>
          <p>
            {"Number of bids: "}
            <span className={classes.detail_value}>{currentNumberOfBids}</span>
          </p>
          <p>
            {"Time left: "}
            <span className={classes.detail_value}>{timeLeft}</span>
          </p>
        </div>
        <div className={classes.bidding_form_container}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              itemId: props.itemId,
              amount: "",
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="amount"
                  type="text"
                  className={classes.bidding_input}
                />
                <Button
                  className={classes.bidding_button}
                  type="submit"
                  variant="outline-*"
                  disabled={!isUserLoggedIn()}
                >
                  PLACE BID
                </Button>
              </Form>
            )}
          </Formik>
          {response}
        </div>
        <div className={classes.details_buttons_container}>
          <button
            className={`${classes.selected_option_button} ${classes.option_button}`}
          >
            Details
          </button>
          <button className={classes.option_button}>Seller information</button>
          <button className={classes.option_button}>Customer reviews</button>
        </div>
        <div className={classes.product_details}>
          <p>{props.details}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
