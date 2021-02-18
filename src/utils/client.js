import React from 'react'
import fetch from 'isomorphic-fetch';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql }  from 'apollo-boost'
import Root from '../root'

export function createCookie(key, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
  var expires = "; expires=" + date.toGMTString();
  document.cookie = key + "=" + value + expires + "; path=/";
}
  
export function readCookie(key) {
  var nameEQ = key + "=";
  var ca = document.cookie.split(';');
  for (var i = 0, max = ca.length; i < max; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const client = new ApolloClient({
  uri: `${process.env.API_ENDPOINT}/graphql/`,
  fetch,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // const token = localStorage.getItem("authToken") || ""
    const token = readCookie("authToken") || ""
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
  clientState: {
    defaults: {
      // isLoggedIn: typeof window !== `undefined` ? !!localStorage.getItem("authToken") : ""
      isLoggedIn: typeof window !== `undefined` ? !!readCookie("authToken") : ""
    }
  }
});

export const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`
export const wrapPageElement = ({ element, props }) => {

  return (
    <>
      <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN_QUERY}>
          {({ data }) => data.isLoggedIn ? (
                  <Root />
              ) : (
                <>
                  {/* <Landing /> */}
                  {element}                
                </>
                  )
            }
        </Query>
      </ApolloProvider>
    </>
  )
};