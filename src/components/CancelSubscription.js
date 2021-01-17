import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { UserContext } from './Dashboard/Layout';
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { VerifiedUserTwoTone } from "@material-ui/icons";
import { 
    Button, 
    Dialog,
    CircularProgress, 
    DialogTitle, 
    LinearProgress, 
    TextField,
    IconButton,
    ThemeProvider, 
    FormHelperText,
    FormControl,
    Slide
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from './ThemeModified'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref}/>)

const CANCEL_SUBSCRIPTION_MUTATION = gql`
	mutation(
		$email: String!
	) {
		cancelSubscription(
            email: $email
		) {
            subscriptions{
                email
            }
	    }
    }
`

const CancelSubscription = ({ classes }) => {

    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false)
    const [fileError, setFileError] = useState("")
    const [openSuccess, setOpenSuccess] = useState(false);

    const currentUser = useContext(UserContext)
    
    const handleSubmit  = async (event, cancelSubscription) => {
        event.preventDefault()
        if (currentUser.email !== email) {
            setFileError(`${email}: Current user info does not match ${currentUser.email}`)
        } else {
            cancelSubscription({
                variables: {
                    email
                }
            }).then(response => {
                    console.log(response.data);
                    setSubmitting(true)
                    setOpenSuccess(true)
                }).catch(error => {
                    console.log(error)
                    setFileError(`Something went wrong!`)
            });
            setEmail('')
            setSubmitting(false)
            setOpenSuccess(false)
            setOpen(false)
        }

    }
    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <CancelScheduleSendIcon
                    style={{ fontSize: 20 }}
                    color="primary"
                >
                    {open ? <ClearIcon /> : <AddIcon /> }
                </CancelScheduleSendIcon>
            </IconButton>
            <Dialog open={open} className={classes.dialog}>
                <ThemeProvider theme={theme}>
                    <Mutation mutation={CANCEL_SUBSCRIPTION_MUTATION}>
                        {(cancelSubscription, {loading, error}) => {
                            return (
                                <form onSubmit={event => handleSubmit(event, cancelSubscription)}>
                                    <DialogTitle>Cancel Subscription</DialogTitle>
                                    <LinearProgress />
                                    <DialogContent>
                                        <DialogContentText>
                                            Your email must match with the email used in service 
                                            Subscription. 
                                            {/* If experienced a network issue, email us at
                                            cancel-subscription@temunah.online. */}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogContent> 
                                        <FormControl error={Boolean(fileError)} fullWidth>
                                                <TextField
                                                    label="Email"
                                                    placeholder="Type your email"
                                                    onChange={(event) => { setEmail(event.target.value)}} 
                                                    value={email}
                                                    fullWidth
                                                    required 
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
                                            className={classes.save}
                                            type="submit"
                                            disabled={submitting || !email.trim()} 
                                        >
                                            {submitting ? (
                                                    <CircularProgress className={classes.save} size={24} />
                                                ) : (
                                                    "Submit"
                                            )}
                                        </Button>
                                    </DialogActions>
                                </form>                                   
                            )}}
                    </Mutation>
                </ThemeProvider>
            </Dialog>
            <Dialog
				open={openSuccess}
				disableBackdropClick={true}
			    TransitionComponent={Transition}
            >
                <ThemeProvider theme={theme}>
                    <DialogTitle>
                        <VerifiedUserTwoTone className={classes.icon} />
                                Susbscription Deleted
                        </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your subscription will be deleted at the end of billing cycle.
                            Is there a feature you will want us to implement to
                            serve you better? If yes, please email us at support@temunah.online.
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

export default withStyles(styles)(CancelSubscription);