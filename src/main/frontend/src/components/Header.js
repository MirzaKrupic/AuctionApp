import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

function Header() {
  return (
    <div className={classes.headercontainer}>
      <Row className={classes.row_positioning}>
        <Col className={classes.socialmediafit}>
              <SocialMedia />
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
