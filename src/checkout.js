import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import AppContext from './context'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useHistory } from 'react-router-dom'


const axios = require('axios')
const stripePromise = loadStripe('pk_test_mzQH2g4eWihEIVM9OUia39xz00WpjfV2AH')


function Checkout(props) {
    // we'll add Stripe's Elements component here later

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutController />
            </Elements>
        </div>
    )
}
export default Checkout


const CheckoutController = props => {
    const context = React.useContext(AppContext)
    const itemtotal = context.getCartTotal()
    const stripe = useStripe()
    const elements = useElements()
    const history = useHistory()
    const [stripeError, setStripeError] = React.useState(null)

    return (
        <div>
        <div>{stripeError}</div>
        <Formik
            initialValues={{
                name: 'Conrad Fox',
                address1: '1234',
                address2: '5678',
                city: 'Provo',
                state: 'UT',
                zipcode: '84602', 
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                console.log('validating', values)
                if (values.name == ""){
                    errors.name = "Name is a required field"
                }
                if (values.address1 == ""){
                    errors.address1 = "Address is a required field"
                }
                if (values.address2 == ""){
                    errors.address2 = "Address is a required field"
                }
                if (values.city == ""){
                    errors.city = "City is a required field"
                }
                if (values.state.length > 2 || values.state == ""){
                    errors.state = "Please input a 2 letter state code"
                }
                if (values.zipcode == ""){
                    errors.zipcode = "Zip code is a required field"
                }
                return errors
            }}
            onSubmit={async (values,actions) => {
                //actions.setSubmitting(true)
                console.log('submit', values)

                //create sale
                const items =[]
                for (const[pid,qty] of Object.entries(context.cart)){
                    const product = context.products[pid]
                    if (product){
                        items.push({
                            pid: pid,
                            qty: qty,
                            price: product.price,
                        })
                    }
                }


                


                const resp = await axios.post('/api/sale/', {

                    name: values.name,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    state: values.state,
                    zipcode: values.zipcode,
                    total: itemtotal,
                    items: items,

                })

                const stripeResp = await stripe.confirmCardPayment( resp.data.client_secret, {
                    payment_method : {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name,

                        },
                    }
                })

                console.log('cannot see', stripeResp)
                actions.setSubmitting(false)

                if (stripeResp.error) {
                        setStripeError(stripeResp.error.message)
                        return
                }
                context.clearCart()
                history.push("/receipt")
                            }}
                        >{form => (
                            <PaymentForm form={form} total={itemtotal} />
                        )}</Formik>
                </div>
                    )
                }

                // if (stripeResp.error){
                //     //show error message
                //     console.log(stripeResp.error.message)
                // }
                // else {
                //     //Payment is processed
                //     if (stripeResp.payment_intent.status == 'succeeded') {
                //             context.clearCart()
                //             history.push("/receipt")
                //     }
                // }
//                 console.log(stripeResp)
//             }}
//         >{form => (
//             <PaymentForm form={form} total={total} />
//         )}</Formik>
//     )
// }


/**
 * The form layout/html.
 * This component needs finishing.
 */
const PaymentForm = props => (
    <Form>
        <bs.Row>
            <bs.Col md='6' style={{textAlign: "left",}}>
                <Input title="Name:" name="name" type="text"/>
                    {console.log(props.form.isSubmitting)}
                    <Input title="Address 1" name="address1" type="text" />
                    <Input title="Address 2" name="address2" type="text" />
                    <Input title="City" name="city" type="text" />
                    <Input title="State" name="state" type="text" />
                    <Input title="Zip Code" name="zipcode" type="text" />
            </bs.Col>
            <bs.Col md='6'style={{textAlign: "left",}}>
                <br></br>
                Card Payment:
                <CardElement />
            </bs.Col>
        </bs.Row>
        <div>
            Total: {props.total}
        </div>
        <bs.Button type="submit" disabled={props.form.isSubmitting} >
            Purchase
            {props.form.isSubmitting && <bs.Spinner animation="border" variant="light" size="sm" role="status" aria-hidden="true" />}
        </bs.Button>
    </Form>
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)