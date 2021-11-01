import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Navigation.module.css";
import { ReactComponent as LogoSvg } from "../assets/auction-app-logo 1.svg";
import { ReactComponent as SearchIconSvg } from "../assets/search-icon.svg";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Navbar className={classes.navigation_bar} collapseOnSelect expand="sm">
      <Container className="no-gutters mx-0 px-0">
        <Row noGutters={true} className={classes.row_positioning}>
          <Col>
            <LogoSvg className={classes.application_logo} />
          </Col>
          <Col xs={6}>
              <input
                className={classes.search_bar}
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <SearchIconSvg className={classes.search_icon} />
          </Col>
          <Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                  <Link
                    className={`${classes.navigation_option} ${classes.active_navigation_option}`}
                    to="/"
                  >
                    Home
                  </Link>
                  <Link className={classes.navigation_option} to="/">
                    Shop
                  </Link>
                  <Link className={classes.navigation_option} to="/">
                    My Account
                  </Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Navigation;
