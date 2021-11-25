import classes from "./ItemInfo.module.css";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../hooks";
import { useContext } from "react";
import { itemBid } from "../../utils/itemService";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ItemInfo(props) {
  const { token, isUserLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState();
  const history = useHistory();

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
            <span className={classes.detail_value}>{props.amount}$</span>
          </p>
          <p>
            {"Number of bids: "}
            <span className={classes.detail_value}>{props.count}</span>
          </p>
          <p>
            {"Time left: "}
            <span className={classes.detail_value}>{props.auctionEndDate}</span>
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
