import classes from "./Footer.module.css";
import { Container, Col, Row } from "react-bootstrap";
import NewsletterForm from "./NewsletterForm";
import FooterSocialMedia from "./FooterSocialMedia";

function Footer() {
  return (
    <div className={classes.footercontainer}>
      <Container>
        <Row className={classes.row_positioning}>
          <Col xs={12} md={4} className={classes.col_positioning}>
            <h3>Auction</h3>
            <ul>
              <li>About us</li>
              <li>Terms and Conditions</li>
              <li>Privacy and Policy</li>
            </ul>
          </Col>

          <Col xs={12} md={4} className={classes.col_positioning}>
            <h3>Auction</h3>
            <ul>
              <li>Call Us at +123 797-567-2535</li>
              <li>support@auction.com</li>
              <li>
                <FooterSocialMedia />
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4} className={classes.col_positioning}>
            <h3>Newsletter</h3>
            <ul>
              <li>
                Enter your email address and get notified about new products. We
                hate spam!
              </li>
              <li>
                <NewsletterForm />
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;