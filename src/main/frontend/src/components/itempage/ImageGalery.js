import classes from './ImageGalery.module.css';
import ItemImage from "../../assets/itempagepic.png";

function ImageGalery(props){
    return(
        <div className={classes.image_galery_container}>
            <div className={classes.main_picture_container}>
                <img className = {classes.full_size_picture} src={props.image} />
            </div>
            <div className={classes.picture_selection_container}>
                <div className={classes.picture_option_container}>
                    <img className = {classes.full_size_picture} src={ItemImage} />
                </div>
                <div className={classes.picture_option_container}>
                    <img className = {classes.full_size_picture} src={ItemImage} />
                </div>
                <div className={classes.picture_option_container}>
                    <img className = {classes.full_size_picture} src={ItemImage} />
                </div>
                <div className={classes.picture_option_container}>
                    <img className = {classes.full_size_picture} src={ItemImage} />
                </div>
                <div className={classes.picture_option_container}>
                    <img className = {classes.full_size_picture} src={ItemImage} />
                </div>
            </div>
        </div>
    );
}

export default ImageGalery;