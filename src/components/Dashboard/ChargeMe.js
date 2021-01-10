import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import User, { ME_QUERY } from './User'

// function calcTotalPrice(cart) {
//     return cart.reduce((tally, cartItem) => {
//       if(!cartItem.item) return tally;
//       return tally + cartItem.quantity * cartItem.item.price
//     }, 0);
// }

export default function ChargeMe({ children }) {
    const onToken = (res, createSubscription) => {
      console.log('Called Token!');
      console.log(res.id);
      // Call mutation once with the stripe token
      createSubscription({
        variables: {
          token: res.id,
        },
      }).catch(err => {
        alert(err.message);
      })
    }

    return (
        <User>
            {({ data: { me }}) => (
              <Mutation
                mutation={CREATE_SUBSCRIPTION_MUTATION}
                refetchQueries={[{ query: ME_QUERY }]}
              >
                {createSubscription => (
                  <StripeCheckout
                    name="Temunah Music" 
                    description="Payment for a month music promotion" 
                    amount={500000}
                    currency="NGN"
                    email={me.email}
                    stripeKey="pk_test_NHHuUD8JPPMyl4deUNm5RVgx00cEkE9P2C"
                    token={res => onToken(res, createSubscription)}
                  />
                )}
              </Mutation>
            )}
        </User>
    )
}

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation createSubscription($token: String, $music: String) {
    createSubscription( 
        token: $token,
        music: $music,
    ) {
      music
      user {
        username
        email
      }
    }
  }
`

  