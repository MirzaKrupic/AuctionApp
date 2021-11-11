import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";
import LayoutContainer from "./LayoutContainer";

function Header() {
  return (
    <div className={classes.headercontainer}>
      <LayoutContainer>
        <Row>
          <Col className={classes.socialmediafit}>
            <SocialMedia />
          </Col>
          <Col className={classes.login_register_position}>
            <p className={classes.login_register_section}>
              <Link to="/login">Login</Link> or
              <Link to="/registration">Register</Link>
            </p>
          </Col>
        </Row>
      </LayoutContainer>
    </div>
  );
}

export default Header;
