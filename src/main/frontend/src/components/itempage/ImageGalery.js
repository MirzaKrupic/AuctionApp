import classes from "./ImageGalery.module.css";
import { useState } from "react";


function ImageGalery(props) {
  const imagesArr = props.image.toString().split(";").filter(function(el) {return el.length != 0});
  const [currentImage, setCurrentImage] = useState(imagesArr[0]);

  const renderImageOptions = () => {
    return (
      <div>
        {imagesArr.map((image, index) => (
          <img className={classes.picture_option} src={image} />
        ))}
      </div>
    );
  };

  return (
    <div className={classes.image_galery_container}>
      <img className={classes.main_picture} src={currentImage} />
      <div className={classes.picture_selection_container}>
        {renderImageOptions()}
      </div>
    </div>
  );
}

export default ImageGalery;
