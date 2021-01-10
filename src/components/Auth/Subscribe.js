import React, { useState } from "react"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { IconButton } from "@material-ui/core"
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import PaymentIcon from '@material-ui/icons/Payment';
import Fab from '@material-ui/core/Fab';
import Error from '../Error'
import Loading from "../Auth/Loading";
import { LinearProgress, ThemeProvider } from "@material-ui/core";
import theme from '../ThemeModified'
// import ChargeMe from "../Dashboard/ChargeMe";
import User, { ME_QUERY } from '../Dashboard/User'


const Subscribe = ({ classes }) => {
	  const [email, setEmail] = useState("")
    const [music, setMusic] = useState("")
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const onToken = async (res) => {
      // Call mutation once with the stripe token
      // createSubscription({
        //   variables: {
          //     token: res.id,
          //   },
          // }).catch(err => {
            //   alert(err.message);
            // })
      try {
        console.log('Called Token!');
        console.log('res.id');
        return res.id
      } catch(err) {
        console.error('Error uploading token', err)
        setSubmitting(false)
      }
    }

    const handleSubmit =  async (event, createSubscription) => {
      event.preventDefault()
      console.log(email, music);
      setSubmitting(true)
      const uploadToken = await onToken()
      createSubscription({ 
        variables: { email, music, token: uploadToken }
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
            onCompleted={data => {
              console.log(data)
              setOpen(false)
              setEmail("")
              setMusic("")
            }}  
            refetchQueries={() => [{ query: ME_QUERY }]}
          > 
            {(createSubscription , { loading, error }) => {
              if (error) return <Error error={error} />
              if (loading) return <Loading />
              return (

                <Dialog open={open} className={classes.dialog}>
                  <ThemeProvider theme={theme}>
                    <form onSubmit={event => handleSubmit(event, createSubscription)}>
                      <DialogTitle>Create Subscription</DialogTitle>
                      <LinearProgress />
                      <DialogContent>
                        <DialogContentText>
                          Add an Email, Music and clck
                          the payment button to continue.
                        </DialogContentText>
                        <FormControl fullWidth>
                          <TextField
                            label="Email"
                            placeholder="Add Email"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                            className={classes.textField}
                            // inputRef={(input) => email = input }
                          />
                          <TextField
                            label="Music"
                            placeholder="Add Music"
                            onChange={event => setMusic(event.target.value)}
                            value={music}
                            className={classes.textField}
                          />
                          <StripeCheckout
                            name="Temunah Music" 
                            description="Payment for a month music promotion" 
                            amount={500000}
                            currency="NGN"
                            email={me.email}
                            stripeKey="pk_test_NHHuUD8JPPMyl4deUNm5RVgx00cEkE9P2C"
                            token={res => onToken(res)}
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
                          disabled={
                            submitting || !email.trim() || !music.trim()
                          }
                          type="submit"
                          className={classes.save}
                        >
                          {submitting ? (
                            <CircularProgress className={classes.save} size={24} />
                          ) : (
                            "Submit"
                          )}
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
  );
};

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation createSubscription($email: String $music: String, $token: String,) {
    createSubscription( 
      email: $email
      music: $music,
      token: $token,
    ) {
      email
      music
      token
    }
  }
`

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

export default withStyles(styles)(Subscribe);