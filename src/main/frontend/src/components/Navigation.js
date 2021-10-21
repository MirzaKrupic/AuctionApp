import { Navbar, Nav, Container, Col,  Row } from 'react-bootstrap';
import React from 'react';
import classes from './Navigation.module.css'
import SearchBar from "material-ui-search-bar";
import { ReactComponent as YourSvg } from '../assets/auction-app-logo 1.svg';


function Navigation(){
    return(
    <Navbar className={classes.nav} collapseOnSelect expand='sm' variant='light'>
        <Container className={"no-gutters mx-0 px-0"}>
        <Row noGutters={true} className={classes.rowfit}>
        <Col>
        <YourSvg className={classes.branding} />
        </Col>
        <Col xs={6}>
        <SearchBar className={classes.bars} placeholder="Try enter: Shoes" />
        </Col>
        <Col>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
                <Nav>
                    <Nav.Link className={`${classes.navchild} ${classes.activechild}`} href='/'>Home</Nav.Link>
                    <Nav.Link className={classes.navchild} href='/'>Shop</Nav.Link>
                    <Nav.Link className={classes.navchild} href='/'>My Account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Col>
        </Row>
        </Container>
    </Navbar>
    );
}

export default Navigation;