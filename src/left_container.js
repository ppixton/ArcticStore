import React from 'react'
import * as bs from 'react-bootstrap'
import {
    Link
  } from "react-router-dom"
//import { bsClass } from 'react-bootstrap/lib/utils/bootstrapUtils'
import AppContext from "./context"

function Left_container(props) {

    const context = React.useContext(AppContext)
    // const categories = {}
    // //let total = 0
    // for (const p of context.products)
    // { 
    //     //If the category isn't there set it's value to one
    //     //If the p.category is already in there- get it's value and add it.
    //     if (p.category.title in categories)
    //     {

    //       categories[p.category.title] = categories[p.category.title] + 1
    //       //total +=1
    //     }
    //     else
    //     {
    //       categories[p.category.title] = 1
    //       //total +=1
    //     }
    // }

    return (
    <bs.Nav className="flex-column">
      <Link to={"/"} className="nav-link">All Products ({context.products.length})</Link>

           {/* {Object.entries(categories).map(([cat, count]) => {
             return (
                 <Link key={cat} to={"/categories/" + cat} className="nav-link"> {cat} ({count}) </Link>
             )
           })} */}

      {context.categories.map(post => (
        <Link key={post.id} to={"/category/" + post.id} className="nav-link">{post.title + " (" + post.count + ")"}</Link>
      ))}

    </bs.Nav>
  )





    // return (
    //     <>
    //     <div>
    //       <Link to="/">All Products ({total})</Link>
    //       {Object.entries(categories).map(([cat, count]) => {
    //         return (
    //             <Link key={cat} to={"/categories/" + cat} className="nav-link"> {cat} ({count}) </Link>
    //         )
    //       })}
    //     </div>
    //     </> 
    //  );
}
export default Left_container