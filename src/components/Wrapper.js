import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe('pk_test_NHHuUD8JPPMyl4deUNm5RVgx00cEkE9P2C');

const Wrapper = () => {
  return <Elements stripe={stripePromise}>
              <CheckoutForm />
          </Elements>
};
export default Wrapper;