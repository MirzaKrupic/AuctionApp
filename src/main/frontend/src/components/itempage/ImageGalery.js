import classes from "./ImageGalery.module.css";
import ItemImage from "../../assets/itempagepic.png";

const renderImageOptions = (images) => {
  const imagesArr = images.split(";");
  return (
    <div>
      {imagesArr.map((image, index) => (
        <img className={classes.picture_option} src={image} />
      ))}
    </div>
  );
};

function ImageGalery(props) {
  return (
    <div className={classes.image_galery_container}>
      <img className={classes.main_picture} src={props.image} />
      <div className={classes.picture_selection_container}>
        {renderImageOptions(props.image)}
      </div>
    </div>
  );
}

export default ImageGalery;
