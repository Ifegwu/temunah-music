import React, { useContext } from "react";
import ExitTopApp from "@material-ui/icons/ExitToApp"
import { ApolloConsumer } from "react-apollo";
import { navigate } from "@reach/router";
import { UserContext } from '../Dashboard/Layout'
import { createCookie } from "../../utils/client";

const Signout = () => {
    const currentUser = useContext(UserContext)
    const handleSignout = client => {
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