import classes from "./Footer.module.css";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className={classes.footercontainer}>
      <Container>
        <Row className={classes.rowfit}>
          <Col xs={12} md={4} className={classes.colfit}>
            <h3>Auction</h3>
            <ul>
              <li className={classes.footer_list}>About us</li>
              <li className={classes.footer_list}>Terms and Conditions</li>
              <li className={classes.footer_list}>Privacy and Policy</li>
            </ul>
          </Col>

          <Col xs={12} md={4} className={classes.colfit}>
            <h3>Auction</h3>
            <ul>
              <li className={classes.footer_list}>
                Call Us at +123 797-567-2535
              </li>
              <li className={classes.footer_list}>support@auction.com</li>
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
              <li className={classes.footer_list}>
                Enter your email address and get notified about new products. We
                hate spam!
              </li>
              <li className={classes.footer_list}>
                <Form>
                  <Form.Row className="d-flex align-items-end">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control
                        className={classes.newsletterinput}
                        type="email"
                        placeholder="Your Email address"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formButton">
                      <Button
                        className={classes.newsletterbtn}
                        variant="outline-*"
                      >
                        Go
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
