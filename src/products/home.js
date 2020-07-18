import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css';
import PRODUCTS from "./products/src/products"
import ProductCard from './product_card'


function home(props) {
  return (
    <div>
      {Object.values(PRODUCTS).map((myValues) => {
        return (
          <bs.Container>
              <ProductCard product={p} key={id} />
          </bs.Container>
        )
      })}
    </div>
 );
}

export default home;