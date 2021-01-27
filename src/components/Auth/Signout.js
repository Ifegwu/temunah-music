import React from "react";
import { ApolloConsumer } from "react-apollo";
import { navigate } from "@reach/router";
import { createCookie } from "../../utils/client";

const Signout = () => {
    const handleSignout = (client) => {
        createCookie('authToken', '', -1);
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth")
    }
    return (
        <ApolloConsumer>
            {client => (
                <div onClick={() => handleSignout(client)} >
                    Signout
                </div>
            )}
        </ApolloConsumer>
    )
}

export default Signout;