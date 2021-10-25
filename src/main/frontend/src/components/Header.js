import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
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
      <Row className={classes.rowfit}>
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
          <p className={classes.rightsection}>
            <a href="">Login</a> &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;{" "}
            <a href="">Register</a>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
