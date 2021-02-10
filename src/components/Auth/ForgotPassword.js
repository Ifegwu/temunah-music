import React, { useState } from 'react' 
import { gql } from 'apollo-boost'
import withStyles from "@material-ui/core/styles/withStyles";
import SettingsIcon from '@material-ui/icons/Settings';
import { ApolloConsumer, Mutation } from "react-apollo"
import { ThemeProvider } from '@material-ui/core'
import theme from '../../styles/ThemeModified'

import Error from '../Error'
import { 
        Dialog, 
        DialogTitle, 
        DialogContentText, 
        DialogContent, 
        FormControl, 
        TextField, 
        DialogActions, 
        Button, 
        CircularProgress, 
        FormHelperText, 
        IconButton, 
        LinearProgress 
    } from '@material-ui/core'


const ForgotPassword = ({ classes  }) => {
    const [submitting, setSubmitting] =  useState(false)
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [fileError, setFileError] = useState("")

    // console.log({ currentUser })
    const handleSubmit = async (event, forgotPassword, client) => {
        event.preventDefault()
        console.log({forgotPassword})
        if (forgotPassword.length && forgotPassword.email) {
            setFileError(`The email provided does not exist`)
        } else {
            setSubmitting(true)
            forgotPassword({variables: {
                email,
                username
            }})
            // console.log({ updateUser })
            setFileError("")
        }
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <SettingsIcon 
                    className={classes.save}
                />
            </IconButton>
            <Mutation
                mutation={FORGOT_PASSWORD}
                onCompleted={data => {
                    // console.log(data)
                    setSubmitting(false)
                    setOpen(false)
                    setEmail("")
                    setUsername("")
                }}
                // update={handleUpdateCache}
            >
                {(forgotPassword, { loading, error }) => {
                    // console.log(updateUser)
                    if (error) return <Error error={error} />
                    
                    return (
                        <ApolloConsumer>
                            {client => (
                            <Dialog open={open} className={classes.dialog}>
                                <ThemeProvider theme={theme}>
                                    <form onSubmit={event => handleSubmit(event, forgotPassword, client)}>
                                        <DialogTitle>Update Your Profile</DialogTitle>
                                        <LinearProgress />
                                        <DialogContentText className={classes.textField}>
                                            If the email provided is correct, you will receive an email confirmation link.
                                        </DialogContentText>
                                        <DialogContent>
                                            <FormControl error={Boolean(fileError)} fullWidth>
                                                <TextField
                                                    label="Username"
                                                    placeholder="Username"
                                                    onChange={event => setUsername(event.target.value)}
                                                    value={username}
                                                    className={classes.textField}
                                                />
                                                <FormHelperText>{fileError}</FormHelperText>
                                                <TextField
                                                    label="Email"
                                                    placeholder="Email"
                                                    onChange={event => setEmail(event.target.value)}
                                                    value={email}
                                                    className={classes.textField}
                                                />
                                                <FormHelperText>{fileError}</FormHelperText>
                                            </FormControl>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                disabled={submitting}
                                                className={classes.cancel}
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={
                                                    submitting || !email.trim()
                                                }
                                                type="submit"
                                                className={classes.save}
                                            >
                                                {submitting ? (
                                                    <CircularProgress className={classes.save} size={24} />
                                                ) : (
                                                    "Update Password"
                                                )}
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </ThemeProvider>
                            </Dialog>
                            )}
                        </ApolloConsumer>
                    )
                }}

            </Mutation>

        </>
    )
}

const styles = theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    dialog: {
      margin: "0 auto",
      maxWidth: 550
    },
    textField: {
      margin: theme.spacing(1),
      paddingLeft: 4,
      paddingright: 4,
      textAlign: 'center'
    },
    cancel: {
      color: "red"
    },
    save: {
      color: "green"
    },
    button: {
      margin: theme.spacing(2)
    },
    icon: {
      marginLeft: theme.spacing(1)
    },
    input: {
      display: "none"
    }
  });

export default withStyles(styles)(ForgotPassword);

const  FORGOT_PASSWORD = gql`
    mutation($email: String!, $username: String!) {
        forgotPassword: passwordRecovery(email: $email, username: $username) {
            user {
                email,
                username
            }
        }
    }
`

