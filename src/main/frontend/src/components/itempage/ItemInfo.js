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
    try {
      const itemRes = await itemBid(token, {
        ...item,
        amount: parseFloat(amount),
      });
      setResponse(itemRes.body);
      if (itemRes.statusCodeValue === 401) {
        history.push(`/login`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.item_info_container}>
      <div className={classes.item_heading}>
        <p className={classes.item_title}>{props.name}</p>
        <p className={classes.item_starting_price}>
          {'Starts from '}
          <span className={classes.starting_price}>${props.startingPrice}</span>
        </p>
      </div>
      <div className={classes.bidding_section}>
        <div className={classes.bidding_info}>
            <p>
            {'Highest Bid: '}
              <span className={classes.detail_value}>{props.amount}$</span>
            </p>
            <p>
            {'Number of bids: '}
              <span className={classes.detail_value}>{props.count}</span>
            </p>
            <p>
            {'Time left: '}
              <span className={classes.detail_value}>
                {props.auctionEndDate}
              </span>
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
        </div>
        <div className={classes.details_buttons_container}>
          <button className={`${classes.selected_option_button} ${classes.option_button}`}>Details</button>
          <button className={classes.option_button}>Seller information</button>
          <button className={classes.option_button}>Customer reviews</button>
        </div>
        <div className={classes.product_details}>
          <p>
            Note: The Jackets is US standard size, Please choose size as your
            usual wear Material: 100% Polyester Detachable Liner Fabric: Warm
            Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and
            Warm. Stand Collar Liner jacket, keep you warm in cold weather.
            Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on
            Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.
            Zippered Hand Pockets and Hidden Pocket keep your things secure.
            Humanized Design: Adjustable and Detachable Hood and Adjustable cuff
            to prevent the wind and water,for a comfortable fit. 3 in 1
            Detachable Design provide more convenience, you can separate the
            coat and inner as needed, or wear it together. It is suitable for
            different season and help you adapt to different climates
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
