import classes from "./Footer.module.css";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <Container className={"no-gutters"}>
        <Row className={classes.rowfit}>
          <Col xs={12} md={4} className={classes.colfit}>
            <h3>Auction</h3>
            <ul>
              <li>About us</li>
              <li>Terms and Conditions</li>
              <li>Privacy and Policy</li>
            </ul>
          </Col>

          <Col xs={12} md={4} className={classes.colfit}>
            <h3>Auction</h3>
            <ul>
              <li>Call Us at +123 797-567-2535</li>
              <li>support@auction.com</li>
              <li>
                <ul className={classes.socialmedia}>
                  <li>
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faGooglePlus} size="2x" />
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4} className={classes.colfit}>
            <h3>Newsletter</h3>
            <ul>
              <li>
                Enter your email address and get notified about new products. We
                hate spam!
              </li>
              <li>
                <Form>
                  <Form.Row className="d-flex align-items-end">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control className={classes.newsletterinput} type="email" placeholder="Your Email address" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formButton">
                        <Button className={classes.newsletterbtn} variant="outline-secondary">Go</Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
