import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css';
//import { useRouteMatch } from "react-router-dom"
//import { useState } from 'react'
import AppContext from './context'
import {
    Link,
  } from "react-router-dom"


function Cart(props) {
    const context = React.useContext(AppContext)
    let totalcost = 0
    return(
        <div>
            <bs.Table responsive="md" hover>
                <thead>
                <tr>
                    <th> </th>
                    <th>Product</th>
                    <th> </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Item Total</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {console.log(context.cart)}
                    {Object.keys(context.cart).map((cid) => {
                        let product = context.products.find(x => x.id == cid)//context.products.cid 
                        let itemtotal = (context.cart[cid]) * (product.price) //cast to int?
                        itemtotal = Math.round(itemtotal* 10) / 10
                        totalcost += itemtotal
                        console.log(product)
                        return(
                        <tr>
                            <td>
                                <bs.Image
                                src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product.filename}-1.png`} 
                                alt="Product Image" 
                                width="100" 
                                height="100" />
                            </td>
                            <td>{product.name}</td>
                            <td></td>
                            <td>{context.cart[cid]}</td>
                            <td>${product.price}</td>
                            <td>${itemtotal}</td>
                            <td>
                                <bs.Button variant='secondary'
                                onClick={e =>{
                                    context.removeFromCart(product.id)
                                }}>
                                Remove</bs.Button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </bs.Table>
            <bs.Table responsive="md">
                <thead>
                <tr>
                    <th> </th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>${totalcost}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Link className="btn btn-success" to={"/checkout"}>Checkout</Link> </td>
                    </tr>
                </tbody>
            </bs.Table>
        </div>
    )
}

export default Cart;