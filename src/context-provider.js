import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import {produce} from 'immer'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            getCartTotal: this.getCartTotal,
            clearCart: this.clearCart,
        }
        this.state = {
            categories: [],
            products: [],
            cart: {},
            cartcount: 0,
        }
    }

    addToCart = (pid) =>{
        this.setState(state =>produce(state,draft =>{
            let qty = draft.cart[pid]
            //check if the item being added is already in the cart
            if(!qty){
                //if it isn't then add it to the cart 
                draft.cart[pid] = 1
            }
            else{
                //if it is then just add 1 to the quantity 
                draft.cart[pid] += 1
            }

            //Loop through the Cart array and add up all of the qty
            draft.cartcount = 0
            for(qty of Object.values(draft.cart)){
                draft.cartcount += qty
            }
        }))
    }

    removeFromCart = (pid) =>{
        this.setState(state =>produce(state,draft =>{
            delete draft.cart[pid]
            draft.cartcount = 0
            for(let c of Object.values(draft.cart)){
                draft.cartcount += c 
            }
        }))

    }

    getCartTotal = () =>{
            let cartTotal = 0
            //Object.values(this.state.products).filter(p => p.id in this.state.cart).map(p => {cartTotal += (this.state.cart[p.id] * p.price)})
            for (let cid of Object.keys(this.state.cart)){
                let product = this.state.products.find(x => x.id == cid)
                cartTotal += (this.state.cart[cid]) * (product.price)
            }
            cartTotal = Math.round(cartTotal* 10) / 10
            return(cartTotal)
    }

    clearCart = () =>{
        this.setState(state =>produce(state,draft =>{
            for (let pid of Object.keys(draft.cart))
            {
                delete draft.cart[pid]
            }
            draft.cartcount = 0
        }))
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        const resp = await axios.get('/api/category/')
        const prod_data = await axios.get('/api/product/')
        this.setState({
            categories: resp.data.map(cat => ({
                ...cat,
                count: prod_data.data.filter(pro => cat.id === pro.category).length})),
            products: prod_data.data,
        })

    }

}