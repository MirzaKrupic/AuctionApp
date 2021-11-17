import classes from "./ImageGalery.module.css";
import ItemImage from "../../assets/itempagepic.png";

function ImageGalery(props) {
  return (
    <div className={classes.image_galery_container}>
      <img className={classes.main_picture_container} src={props.image} />
      <div className={classes.picture_selection_container}>
        <img className={classes.picture_option_container} src={props.image} />
      </div>
    </div>
  );
}

export default ImageGalery;
