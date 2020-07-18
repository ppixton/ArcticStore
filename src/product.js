import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css';
import { useRouteMatch } from "react-router-dom"
import { useState } from 'react'
import AppContext from './context';
import { useHistory } from 'react-router-dom'

function Product() {
  const context = React.useContext(AppContext)
  const [img, setImage] = useState(1)
  let match_id = useRouteMatch("/product/:productid")
  let history = useHistory()

  let product_detail = []
  product_detail = context.products.find(x => x.id == match_id.params.productid)

  function myclicker(){
    context.addToCart(match_id.params.productid)
    history.push("/cart")
    }

  return (
    <bs.Container style={{ padding: "2rem 2rem"}}>
        <bs.Row>
            <bs.Col md="8">
                <h1>{product_detail.name}</h1>
                <h2>${product_detail.price}</h2>
                <p>{product_detail.description}</p>

                <p>
                    <bs.Button 
                        variant='warning'
                        onClick={e =>{
                            context.addToCart(product_detail.id)
                        }}>
                        Add to Cart
                    </bs.Button>
                </p>
                <p>
                    <bs.Button 
                        variant='warning'
                        onClick={myclicker}>
                        Buy Now
                    </bs.Button>
                </p>
            </bs.Col>
            <bs.Col md="4">
                <bs.Image className="float-right img-thumbnail"
                          src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product_detail.filename}-${img}.png`}
                          alt="Product Image" 
                          width="300" 
                          height="300" />
                          
            </bs.Col>
        </bs.Row>
        <bs.Row>
            <bs.Col md="8"></bs.Col>
            <bs.Col md="4" style={{ padding: "1rem 1rem"}}>
                <bs.Image onMouseEnter={() => setImage(1)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product_detail.filename}-1.png`} width="30" height="30" style={{ margin: ".3rem .3rem"}} thumbnail />
                <bs.Image onMouseEnter={() => setImage(2)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product_detail.filename}-2.png`} width="30" height="30" style={{ margin: ".3rem .3rem"}} thumbnail />
                <bs.Image onMouseEnter={() => setImage(3)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product_detail.filename}-3.png`} width="30" height="30" style={{ margin: ".3rem .3rem", padding: "0"}} thumbnail />
                <bs.Image onMouseEnter={() => setImage(4)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${product_detail.filename}-4.png`} width="30" height="30" style={{ margin: ".3rem .3rem", padding: "0"}} thumbnail />
            </bs.Col>
        </bs.Row>
    </bs.Container>
)






  
  // let product_ids = []
  // product_ids = context.products.find(x => x.id == match_id.params.id)

  // for (let pid of Object.values(PRODUCTS))
  // {
  //   product_ids.push(pid.id)
  // }


  // let my_error = true
  // for (let mid of product_ids)
  // {
  //   if (match_id.params.id === mid)
  //   {
  //     my_error = false
  //   }
  // }


  // if (my_error === true)
  // {
  //   return (
  //     <div>Error 404 - Object not found</div>
  //   )
  // }

//   return (
//     <>
//     <div style={{
//       float:"right"
//     }}>
//       <div>
//         <bs.Image src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-${img}.png`}style={{
//           height: "300px",
//           width: "300px"
//         }} />
//       </div>
//         <bs.Image onMouseEnter={() => setImage(1)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-${img}.png`}/           height: "30px",
//           width: "30px",
//           margin:"5px"
//         }} />
//         <bs.Image onMouseEnter={() => setImage(2)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-${img}.png`}/           height: "30px",
//           width: "30px",
//           margin:"5px"
//         }} />
//         <bs.Image onMouseEnter={() => setImage(3)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-${img}.png`}/           height: "30px",
//           width: "30px",
//           margin:"5px"
//         }} />
//         <bs.Image onMouseEnter={() => setImage(4)} src={`${process.env.PUBLIC_URL}/product_images/product_images/public/media/products/${props.product.filename}-${img}.png`}/           height: "30px",
//           width: "30px",
//           margin:"5px"
//         }} />
//     </div>
//       <div style={{
//         fontWeight:"bold",
//         textAlign: "left",
//         fontSize: "40px"

//       }}>
//         {item.name} <br></br>
//         <div style={{
//           fontSize: "25px"
//         }}>
//           ${item.price}
//         </div>
//         <div style={{
//           fontWeight:"normal",
//           fontSize:"15px",
//           margin:"5px"
//         }}>
//           <br></br>
//           {item.description}
//         </div>
//       </div>

//     </>
//  );
}

export default Product;