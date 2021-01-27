import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from './Dashboard/CheckoutForm';
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe("pk_test_NHHuUD8JPPMyl4deUNm5RVgx00cEkE9P2C");

const Wrapper = () => {
  return <Elements stripe={stripePromise}>
              <CheckoutForm />
          </Elements>
};
export default Wrapper;