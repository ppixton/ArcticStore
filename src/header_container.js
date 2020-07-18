import React from "react";
import {
  Link
} from "react-router-dom"
import * as bs from 'react-bootstrap'
import AppContext from './context';

function Header_container (props) {
    const context = React.useContext(AppContext)
    return (
        <bs.Navbar expand="lg" variant="tabs" style ={{backgroundColor: "#ffffff", color:"#ffffff"}}>
            <bs.Navbar.Brand href="/">
            <i class="fas fa-snowman" style={{
              color:"black",
            }}></i>
                Arctic
            </bs.Navbar.Brand>
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav">
                <bs.Nav className="mr-auto">
                <Link to="/Home" className="nav-link">Home</Link>
                <Link to="/Help" className="nav-link">Help</Link>
                <Link to="/About" className="nav-link">About</Link>
                <Link to="/cart" className="nav-link">
                <i class="fas fa-shopping-cart">{context.cartcount}</i>
                </Link>
                </bs.Nav>
            </bs.Navbar.Collapse>  
            <bs.Navbar.Collapse className="justify-content-end"style={{
              color:"black",
            }}>
                <bs.Navbar.Text>
                Signed in as: <a href="#login">Parker Pixton</a>
                </bs.Navbar.Text>
            </bs.Navbar.Collapse>

            </bs.Navbar>
    )
}

export default Header_container