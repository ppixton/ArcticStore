import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css';
import './index.scss'  // I just changed this
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import HeaderContainer from './header_container'
import LeftContainer from './left_container'
import Middle from './middle_container'
import RightContainer from './right_container'
import FooterContainer from './footer_container'
import Product from './product'
import Categories from './categories'
import Cart from './cart'
import Checkout from './checkout'
import Receipt from './receipt'

function App() {
  return (
    <Router>
      <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
        <bs.Row noGutters className ="flex-grow-0 flex-shrink-0 shadow-sm">
          <bs.Col className="px-3 py-2" style={{backgroundColor: "#000000", color:"#ffffff"}}>
            <HeaderContainer />
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className ="flex-grow-1">
          <bs.Col md="2" className="px-3 py-4 shadow" style={{backgroundColor: "#d3d3d3"}}>
            <LeftContainer />
          </bs.Col>
          <bs.Col md="8" className="px-3 py-4 shadow" style={{backgroundColor: "#ffffff" ,textAlign:"center"}}>
            <Switch>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/receipt">
                <Receipt />
              </Route>
              <Route path="/">
                <Middle />
              </Route>
              <Route path="/categories">
                <Categories />
              </Route>
            </Switch>
          </bs.Col>
          <bs.Col md="2" className="px-3 py-4 shadow" style={{backgroundColor: "#336699", textAlign:"center"}}>
            <RightContainer />
          </bs.Col>
        </bs.Row>

        <bs.Row noGutters className ="flex-grow-0 flex-shrink-0">
          <bs.Col className="px-3 py-2" style={{backgroundColor: "#003366", color:"white", textAlign: "center"}}>
            <FooterContainer />
          </bs.Col>
        </bs.Row>
      </bs.Container>
    </Router>
 );
}

export default App;
