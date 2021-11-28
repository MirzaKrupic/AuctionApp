import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";
import LayoutContainer from "./LayoutContainer";
import { AuthContext } from "../hooks";
import { useEffect, useState, useContext } from "react";

function Header() {
  const { token, isUserLoggedIn, setToken } = useContext(AuthContext);
  const [rightContent, setRightContent] = useState(
    <p className={classes.login_register_section}>
      <Link to="/login">Login</Link> or
      <Link to="/registration">Register</Link>
    </p>
  );

  useEffect(async () => {
    if (token !== null) {
      setRightContent(
        <p className={classes.logout} onClick={() => setToken(null)}>
          Logout
        </p>
      );
    }else{
      setRightContent(
        <p className={classes.login_register_section}>
          <Link to="/login">Login</Link> or
          <Link to="/registration">Register</Link>
        </p>
      )
    }
  }, [token]);

  return (
    <div className={classes.headercontainer}>
      <LayoutContainer>
        <Row>
          <Col className={classes.socialmediafit}>
            <SocialMedia />
          </Col>
          <Col className={classes.login_register_position}>{rightContent}</Col>
        </Row>
      </LayoutContainer>
    </div>
  );
}

export default Header;
