import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <div className={classes.headercontainer}>
      <Row className={classes.row_positioning}>
        <Col className={classes.socialmediafit}>
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
        </Col>
        <Col>
          <p className={classes.login_register_section}>
            <Link to="/">Login</Link> or
            <Link to="/">Register</Link>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
