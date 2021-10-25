import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Navigation.module.css";
import SearchBar from "material-ui-search-bar";
import { ReactComponent as LogoSvg } from "../assets/auction-app-logo 1.svg";
import { Link, BrowserRouter } from "react-router-dom";

function Navigation() {
  return (
    <Navbar
      className={classes.navigation_bar}
      collapseOnSelect
      expand="sm"
      variant="light"
    >
      <Container className="no-gutters mx-0 px-0">
        <Row noGutters={true} className={classes.rowfit}>
          <Col>
            <LogoSvg className={classes.branding} />
          </Col>
          <Col xs={6}>
            <SearchBar
              className={classes.bars}
              placeholder="Try enter: Shoes"
              style={{ boxShadow: `0px 0px 0px` }}
            />
          </Col>
          <Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <BrowserRouter>
                  <Nav.Link
                    className={`${classes.navigation_option} ${classes.active_navigation_option}`}
                    to="/"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link className={classes.navigation_option} to="/">
                    Shop
                  </Nav.Link>
                  <Nav.Link className={classes.navigation_option} to="/">
                    My Account
                  </Nav.Link>
                </BrowserRouter>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Navigation;
