import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css'
import {
  Link,
  //useRouteMatch
} from "react-router-dom"


function ProductCard(props) {
    //let category_matched = useRouteMatch("/categories/:category");
            return (
                <bs.Col md='3'>
                <bs.Card style={{ width: '15rem', height: '20rem', padding:'2rem'}}>
                    <bs.Card.Img variant="top" src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-1.png`} />
                        <bs.Card.Body>
                        <bs.Card.Title>{props.product.name}</bs.Card.Title>
                            <bs.Card.Text>
                            ${props.product.price}
                            </bs.Card.Text>
                        </bs.Card.Body>
                        <Link  to={"/product/" + props.product.id} className="btn btn-primary" style={{
                            color: "white",
                            position: "absolute",
                            top: "10px",
                            right: "10px"
                            }}>
                            Details
                        </Link>
                </bs.Card>
                </bs.Col>
 );
};
export default ProductCard;