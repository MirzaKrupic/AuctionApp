import classes from './FooterSocialMedia.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function FooterSocialMedia() {
    return (
        <div className={classes.socialmediapositioning}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            <FontAwesomeIcon icon={faTwitter} size="2x" />
            <FontAwesomeIcon icon={faGooglePlus} size="2x" />
        </div>
    );
}

export default FooterSocialMedia;