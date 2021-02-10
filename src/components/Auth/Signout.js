import React, { useEffect } from "react";
import { ApolloConsumer } from "react-apollo";
import { navigate } from "@reach/router";
import {createCookie, IS_LOGGED_IN_QUERY } from "../../utils/client";


const Signout = ({ currentUser }) => {
    
    const handleSignout = (client) => {
        // client.writeData({ data: { isLoggedIn: false }})
        client.writeQuery({ 
            query: IS_LOGGED_IN_QUERY, 
            data: { 
                isLoggedIn: false
            },
            variables: {
                id: null
            }
        })     
        createCookie('authToken', '', -1); 
        navigate("/auth") 
    }

    useEffect(() => {
    }, [currentUser])

    return (
        <ApolloConsumer>
            {(client) => {
                return <div onClick={() => handleSignout(client)} >
                    Signout
                </div>
            }}
        </ApolloConsumer> 
    )
}

export default Signout;