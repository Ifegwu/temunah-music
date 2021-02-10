import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import { client, IS_LOGGED_IN_QUERY } from "../../utils/client";
import { ApolloConsumer } from "react-apollo";

function isAuthenticated() {
  return client.writeQuery({
    query: IS_LOGGED_IN_QUERY,
    data: { isLoggedIn: true }
  })
}

// const isAuthenticated = () => {

//   const handleSubmit = ({ client }) => {
//     const readUser = client.readQuery({
//       query: IS_LOGGED_IN_QUERY,
//       data: { 
//         isLoggedIn: true
//       }
//     })

//     client.writeQuery({
//       query: IS_LOGGED_IN_QUERY, 
//         data: { 
//           isLoggedIn: readUser
//         }
//     })
//   }
//   return (
//     <ApolloConsumer>
//       {(client) => {
//         return (() => handleSubmit(client))
//       }}
//     </ApolloConsumer>
//   )
// }

export const isBrowser = () => typeof window !== "undefined"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log(!isAuthenticated)
  if (!isAuthenticated() && isBrowser && window.location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return (
    <Router>
      <Component {...rest} />
    </Router>
  )
}

export default PrivateRoute