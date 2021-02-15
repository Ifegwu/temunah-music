import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from './Dashboard/CheckoutForm';
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe("pk_live_4J5H4B5rpORQ2oNPt1xbIlcX001Q8YF8Tc")

const Wrapper = () => {
  return <Elements stripe={stripePromise}>
              <CheckoutForm />
          </Elements>
};
export default Wrapper;