import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState, useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import PaymentIcon from '@material-ui/icons/Payment';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { 
    Button, 
    CircularProgress, 
    DialogTitle, 
    LinearProgress, 
    TextField,
    IconButton,
    ThemeProvider, 
    FormHelperText,
    FormControl,
    Snackbar,
    Slide
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from '../ThemeModified'
import Error from '../Error'
import { UserContext } from './Layout'
import styled from 'styled-components';
import { VerifiedUserTwoTone } from "@material-ui/icons";
import { navigate } from "gatsby";

const CardStyles = styled.div`
    display: grid;
    grid-template-flex: rows;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    width: 300px;
    color: var(--primary);
`
const PAYMENT_MUTATION = gql`
	mutation(
		$email: String!, 
        $music: String!,
        $paymentMethodId: String!,
	) {
		createSubscription(
            email: $email, 
            music: $music,
            paymentMethodId: $paymentMethodId
		) {
            subscriptions{
                email
                music
            }
	    }
    }
`

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref}/>)

const CheckoutForm = ({ classes }) => {
    // const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [music, setMusic] = useState('');
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(true);
    const [submitting, setSubmitting] = useState(false)
    const [fileError, setFileError] = useState("")
    const [error, setError] = useState(null)
    const stripe = useStripe();
    const elements = useElements();
    
    const currentUser = useContext(UserContext)

    // Handle real-time validation errors from the CardElement.
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }
    
    // Handle form submission.
    const handleSubmit = async (event, createSubscription) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
    
        // add these lines
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });
        console.log(paymentMethod)
        if (error) {
            setError(error.response.data)
        }
        if (!stripe || !elements) {
            return;
        } 
        if (currentUser.email !== email) {
            setFileError(`${email}: Current user info does not match ${currentUser.email}`)
        } else {
            createSubscription({
                variables: {
                    email, 
                    music,
                    paymentMethodId: paymentMethod.id
                }
            }).then(response => {
                // console.log(response.data);
                setSubmitting(true);
                setOpenSuccess(true)
                setOpenError(false)
            }).catch(error => {
                console.log(error)
            });
            setEmail('')
            setSubmitting(false)
            setOpen(false)
            setOpenSuccess(false)
        }
    }


    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <PaymentIcon
                style={{ fontSize: 20 }}
                color="primary"
                >
                    {open ? <ClearIcon /> : <AddIcon /> }
                </PaymentIcon>
            </IconButton>
            <Dialog open={open} className={classes.dialog}>
                <ThemeProvider theme={theme}>
                    <Mutation mutation={PAYMENT_MUTATION}>
                        {(createSubscription, {loading, error}) => {
                            return (
                            <form onSubmit={event => handleSubmit(event, createSubscription)}>
                                <DialogTitle>Create Subscription</DialogTitle>
                                <LinearProgress />
                                <DialogContent>
                                    <DialogContentText>
                                        A Mothly Subscription
                                    </DialogContentText>
                                    <FormControl error={Boolean(fileError)} fullWidth>
                                        <TextField
                                            label="Email"
                                            placeholder="Add Email"
                                            onChange={(event) => { setEmail(event.target.value)}} 
                                            value={email}
                                            fullWidth
                                            required 
                                            className={classes.textField}
                                        />
                                        <TextField
                                            label="Music Name"
                                            placeholder="Add Music"
                                            onChange={(event) => { setMusic(event.target.value)}} 
                                            value={music}
                                            fullWidth
                                            required 
                                            className={classes.textField}
                                        />
                                        <DialogContentText>
                                            Credit or debit card
                                        </DialogContentText>
                                        <CardStyles>
                                            <label htmlFor="card-element" /> 
                                            <CardElement 
                                                id="card-element" 
                                                onChange={handleChange}
                                                options={{
                                                    style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                        color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                    },
                                                }}
                                            />
                                            <FormHelperText>{fileError}</FormHelperText>
                                        </CardStyles>
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
                                        className={classes.save}
                                        type="submit"
                                        disabled={submitting || !email.trim() || !music.trim() ||!stripe || !elements} 
                                    >
                                        {submitting ? (
                                                <CircularProgress className={classes.save} size={24} />
                                            ) : (
                                                "Submit"
                                        )}
                                    </Button>
                                </DialogActions>
                            </form>
                            )
                        }}
                    </Mutation>
                </ThemeProvider>
            </Dialog>
            {/* Success Dialog */}
			<Dialog
				open={openSuccess}
				disableBackdropClick={true}
			    TransitionComponent={Transition}
            >
                <ThemeProvider theme={theme}>
                    <DialogTitle>
                        <VerifiedUserTwoTone className={classes.icon} />
                                New Susbscription
                        </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Subscription succesfully created!
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <Button
                            onClick={() => setOpenSuccess(false)}
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogContent>
                </ThemeProvider>
            </Dialog>
        </>
    );
};

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

export default withStyles(styles)(CheckoutForm);