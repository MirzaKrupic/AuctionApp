import "./LandingPageItem.css";
import ItemImage from "../../assets/lowersectpic.png";

function LandingPageItem(props) {
    return (
      <div className = {`item_box_common ${props.item_type.toLowerCase()}_item_box`}>
        <div className = {`${props.item_type.toLowerCase()}_image_container`}>
          <img className = {`full_size_picture`} src={ItemImage} />
        </div>
        <h3 className={`card_title`}>{props.card_title}</h3>
        <p className= {`card_description`} >
          Start from <span className= {`card_price`}>${props.price}</span>
        </p>
      </div>
    );
}

export default LandingPageItem;
