import React, { useState } from "react";
// import { ApolloConsumer } from "react-apollo";
import { navigate } from '@reach/router'
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { createCookie } from "../../utils/client";
import { ThemeProvider } from "styled-components";
import theme from "../ThemeModified";


const Error = ({ classes, error, client, currentUser }) => {
    const [open, setOpen] = useState(true)
    // console.log(client, error, currentUser);

    const errorMessage = "Your session has expired, please login to continue"
    const errorNotLoggedIn = "Not Logged in!"
    const errorSignature = "Signature has expired"
    const networkError = "Failed to fetch"

    const handleNetworkError = () => {
      if(client) {
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth?message=" + networkError )
      }
    }

    const handleUndefined = () => {
      if (client) {
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth?message=" + errorSignature )
      }
    }

    const handleLogout = () => {
      if (currentUser || client) {
        // localStorage.removeItem('authToken')
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth?message=" + errorMessage )
      }
    }

    const handleNotLoggedIn = () => {
      if (currentUser || client) {
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth?message=" + errorNotLoggedIn )
      }
    }

    const handleSinatureHasExpired = () => {
      if (currentUser || client) {
        // localStorage.removeItem('authToken')
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/auth?message=" + errorSignature )
      }
    }

    const handleUndefinedRoot = () => {
      if (currentUser || client) {
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/?message=" + errorSignature )
      }
    }

    const handleLogoutRoot = () => {
      if (currentUser || client) {
        // localStorage.removeItem('authToken')
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/?message=" + errorMessage )
      }
    }

    const handleNotLoggedInRoot = () => {
      if (currentUser || client) {
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/?message=" + errorNotLoggedIn )
      }
    }

    const handleSinatureHasExpiredRoot = () => {
      if (currentUser || client) {
        // localStorage.removeItem('authToken')
        createCookie('authToken', '', -1);
        sessionStorage.removeItem('authToken')
        client.writeData({ data: { isLoggedIn: false } })
        navigate("/?message=" + errorSignature )
      }
    }

    if (error.message.toString().includes("Failed to fetch")) {
      handleNetworkError()
    }
    if (error.message.toString().includes("Not Logged in!")) {
      handleNotLoggedIn()
    } 
    if (error.message.toString().includes("Not Logged in!")) {
      handleNotLoggedInRoot()
    } 
    if (error.message.toString().includes("Signature has expired")) {
      handleSinatureHasExpired()
    } 
    if (error.message.toString().includes("Signature has expired")) {
      handleSinatureHasExpiredRoot()
    } 
    if (error.message.toString().includes("Signature has expired")) {
      handleUndefined()
    }
    if (error.message.toString().includes("Signature has expired")) {
      handleUndefinedRoot()
    }

    if (error.message.toString().includes("Signature has expired")) {
      handleLogoutRoot()
    }
    
    if (error.message.toString().includes("Signature has expired")) {
      handleLogout()
      handleLogoutRoot()
      return (<Snackbar 
        message={error.message}
        open={open}
        className={classes.snackbar}
      />)
    }
    
    return (
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={open}
          className={classes.snackbar}
          message={error.message}
          action={
            <Button 
              onClick={() => {setOpen(false); handleLogout()}} color="secondary" size="small">
              Close
            </Button>
          }
        />
      </ThemeProvider>
    )
};

const styles = theme => ({
  snackbar: {
    margin: theme.spacing()
  }
});

export default withStyles(styles)(Error);