import classes from './Footer.module.css';
import { Navbar, Nav, Container, Col,  Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGooglePlus,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

function Footer(){
    return(
    <footer>
        <Container>
            <Row className={classes.rowfit}>
                <Col className={classes.coltest}>
                    <h3>Auction</h3>
                    <ul>
                        <li>About us</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy and Policy</li>
                    </ul>
                </Col>
                    
                <Col className={classes.coltest}>
                <h3>Get in touch</h3>
                    <ul>
                        <li>Call Us at +123 797-567-2535</li>
                        <li>support@auction.com</li>
                        <li>
                            <ul className={classes.socialmedia}>
                                <li><FontAwesomeIcon icon={faFacebook} size="2x" /></li>
                                <li><FontAwesomeIcon icon={faInstagram} size="2x" /></li>
                                <li><FontAwesomeIcon icon={faTwitter} size="2x" /></li>
                                <li><FontAwesomeIcon icon={faGooglePlus} size="2x" /></li>
                            </ul>
                        </li>
                    </ul>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    </footer>
    );
}

export default Footer