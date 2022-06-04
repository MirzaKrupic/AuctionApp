import classes from "../../pages/User_items.module.css";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as CartSvg } from "../../assets/cart.svg";
import { computeTimeLeft } from "../../utils/itemUtils";

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

  const getHighestBid = (item) => {
    if (item.bids.length > 0) {
      const amounts = item.bids.map((bid) => bid.amount);
      return Math.max(amounts);
    } else return item.startingPrice;
  }

function ItemList({items}){
    return <div>
        
            {items && items.length> 0 ? (
              
            items.map((item) => (
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
          ) 
    </div>
}

export default ItemList;