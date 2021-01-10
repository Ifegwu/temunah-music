import React, { useState, useContext } from 'react' 
import { gql } from 'apollo-boost'
import withStyles from "@material-ui/core/styles/withStyles";
import SettingsIcon from '@material-ui/icons/Settings';
import { ApolloConsumer, Mutation } from "react-apollo"
import { ThemeProvider } from '@material-ui/core'
import theme from '../ThemeModified'

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

import { UserContext } from '../Dashboard/Layout';

const UpdateUser = ({ classes  }) => {
    const currentUser = useContext(UserContext)
    const [submitting, setSubmitting] =  useState(false)
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fileError, setFileError] = useState("")

    // console.log({ currentUser })
    const handleSubmit = async (event, updateUser, client) => {
        event.preventDefault()
        // console.log({updateUser})
        if (updateUser.id && updateUser.length !== currentUser.id) {
            setFileError(`${updateUser.id}: Current user info does not match`)
        } else {
            setSubmitting(true)
            updateUser({variables: {
                id: currentUser.id,
                username,
                // email,
                password
    
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
                mutation={UPDATE_PROFILE}
                onCompleted={data => {
                    // console.log(data)
                    setSubmitting(false)
                    setOpen(false)
                    setUsername("")
                    // setEmail("")
                    setPassword("")
                }}
                // update={handleUpdateCache}
            >
                {(updateUser, { loading, error }) => {
                    // console.log(updateUser)
                    if (error) return <Error error={error} />
                    
                    return (
                        <ApolloConsumer>
                            {client => (
                            <Dialog open={open} className={classes.dialog}>
                                <ThemeProvider theme={theme}>
                                    <form onSubmit={event => handleSubmit(event, updateUser, client)}>
                                        <DialogTitle>Update Your Profile</DialogTitle>
                                        <LinearProgress />
                                        <DialogContentText className={classes.textField}>
                                            Fields cannot be empty. 
                                            If intend not to edit any field,
                                            provide the credential formally used.
                                        </DialogContentText>
                                        <DialogContent>
                                            <FormControl error={Boolean(fileError)} fullWidth>
                                                <TextField
                                                    label="Username"
                                                    placeholder="Edit your username"
                                                    onChange={event => setUsername(event.target.value)}
                                                    value={username}
                                                    className={classes.textField}
                                                />
                                                <FormHelperText>{fileError}</FormHelperText>
                                                {/* <TextField
                                                    label="Email"
                                                    placeholder="Email"
                                                    onChange={event => setEmail(event.target.value)}
                                                    value={email}
                                                    className={classes.textField}
                                                />
                                                <FormHelperText>{fileError}</FormHelperText> */}
                                                <TextField
                                                    label="Password"
                                                    placeholder="Password"
                                                    onChange={event => setPassword(event.target.value)}
                                                    value={password}
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
                                                    submitting || !username.trim() || !password.trim()
                                                }
                                                type="submit"
                                                className={classes.save}
                                            >
                                                {submitting ? (
                                                    <CircularProgress className={classes.save} size={24} />
                                                ) : (
                                                    "Update Profile"
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
      margin: theme.spacing(1)
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

export default withStyles(styles)(UpdateUser);

const  UPDATE_PROFILE = gql`
    mutation($username: String, $email: String, $password: String) {
        updateUser(
        userData: {username: $username, email: $email, password: $password}
        ){
        user {
            id
            username
            email
            password
        }
        }
    } 
`

