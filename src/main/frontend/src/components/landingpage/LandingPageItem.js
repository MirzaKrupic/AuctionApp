import "./LandingPageItem.css";
import ItemImage from "../../assets/lowersectpic.png";
import { Link } from "react-router-dom";

function LandingPageItem(props) {
    return (
      <div className = {`item_box_common ${props.item_type.toLowerCase()}_item_box`}>
        <div className = {`${props.item_type.toLowerCase()}_image_container`}>
          <img className = {`full_size_picture`} src={ItemImage} />
        </div>
        <Link className={`item_link`} to={`/items/${props.itemId}`}><h3 className={`card_title`}>{props.name}</h3></Link>
        <p className= {`card_description`} >
          Start from <span className= {`card_price`}>${props.startingPrice}</span>
        </p>
      </div>
    );
}

export default LandingPageItem;
