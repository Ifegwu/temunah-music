import React, { useState } from "react"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import StripeCheckout from 'react-stripe-checkout';
import withStyles from "@material-ui/core/styles/withStyles";

import { Dialog, DialogActions, DialogContent, DialogContentText, FormControl, IconButton } from "@material-ui/core"

import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import PaymentIcon from '@material-ui/icons/Payment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Error from '../Error'
import Loading from "../Auth/Loading";
import theme from '../ThemeModified'
import User, { ME_QUERY } from '../Dashboard/User'
import { mergeClasses, ThemeProvider } from "@material-ui/styles";


const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation($email: String, $token: String) {
    createSubscription( 
      email: $email
      token: $token
    ) {
      email
      token
    }
  }
`


const ChargeUser = ({ classes }) => {
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const onToken = async (res, createSubscription, email) => {
        // Call mutation once with the stripe token
        console.log(res, email)
        createSubscription({
            variables: {
                token: res.id,
                email,
              },
            }).catch(err => {
                alert(err.message);
              })
      }

    const handleSubmit = async (event, createSubscription) => {
      event.preventDefault()
      const uploadSubscription = await onToken()
      console.log(uploadSubscription.email)
      createSubscription({
        variables: {
          email: uploadSubscription.email,
          token: uploadSubscription.token
        }
      })
    }
    return (
        <User>
            {({ data: { me }}) => (
                <>
                <IconButton onClick={() => setOpen(true)}>
                    <PaymentIcon
                    style={{ fontSize: 20 }}
                    color="primary"
                    >
                    {open ? <ClearIcon /> : <AddIcon /> }
                    </PaymentIcon>
                </IconButton>
                <Mutation 
                    mutation={CREATE_SUBSCRIPTION_MUTATION}
                    variables={{ token, email }}
                    onCompleted={data => {
                      console.log(data)
                      setOpen(false)
                      setEmail("")
                      setToken("")
                    }}  
                    refetchQueries={() => [{ query: ME_QUERY }]}
                > 
                    {(createSubscription , { loading, error }) => {
                    if (error) return <Error error={error} />
                    if (loading) return <Loading />
                    const email = me.email
                    console.log(email)
                    return (
                      <Dialog open={open} className={mergeClasses.dialog}>
                        <ThemeProvider theme={theme}>
                          <form onSubmit={event => handleSubmit(event, createSubscription)}>
                            <DialogContent>
                              <DialogContentText>Add you subscription details here</DialogContentText>
                              <FormControl fullWidth>
                                <TextField 
                                  id="email" 
                                  label="Email" 
                                  variant="outlined"
                                  type="email" 
                                  className={classes.textField}
                                />
                              </FormControl>
                              <FormControl>
                                <StripeCheckout
                                  name="Temunah Music" 
                                  description="Payment for a month music promotion" 
                                  amount={500000}
                                  currency="NGN"
                                  email={me.email}
                                  stripeKey="pk_test_NHHuUD8JPPMyl4deUNm5RVgx00cEkE9P2C"
                                  token={res => onToken(res, createSubscription, email)}
                                />
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
                                type="submit"
                                className={classes.save}
                              >
                                Submit
                              </Button>
                            </DialogActions>
                          </form>
                        </ThemeProvider>
                      </Dialog>
                    )
                }}
                </Mutation>
            </>
            )}
        </User>
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
  },
  fab: {
    position: "static",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: "inherit",
    // zIndex: "200",
    
  }
});

export default withStyles(styles)(ChargeUser);