import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css'
import {
  useRouteMatch
} from "react-router-dom"
import ProductCard from './product_card'
import AppContext from './context';


function Middle(props) {
    let category_matched = useRouteMatch("/category/:category");
    const context = React.useContext(AppContext)

  return (

    <bs.Row style={{ padding: "2rem 2rem"}}>     
            {context.products.filter(p => {
                if (category_matched) {
                    return p.category == category_matched.params.category
                } else {
                    return true
                }
            }).map((p, k) => {
                return (
                <bs.Col key={`Col ${p.id}`} md="3">
                    <ProductCard product={p} key={k} />
                    <br />
                </bs.Col>
                )
                })}               
        </bs.Row>    

    // <bs.Container>
    //     <bs.Row>
    //         {Object.values(PRODUCTS)
    //         .filter(
    //             val => {
    //                 if (category_matched)
    //                 {
    //                     return val.category === category_matched.params.category;
    //                 }
    //                 else
    //                 {
    //                     return true
    //                 }
    //             }).map((product, id) => {
    //         return (
    //             <ProductCard product={product} key={id}/>
    //         )
    //     })}
    //     </bs.Row>
    // </bs.Container>
 );
};
export default Middle;