import React, { useState, useContext } from 'react'
import ApiService from './constant/api'
import { UserContext } from './Dashboard/Layout';
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
    FormControl
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from './ThemeModified'

const CancelSubscription = ({ classes }) => {

    const [fileError, setFileError] = useState("")
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false)

    const currentUser = useContext(UserContext)
    
    const handleSubmit  = async (event) => {
        event.preventDefault()
        if (currentUser.email !== email) {
            setFileError(`${email}: Current user info does not match ${currentUser.email}`)
        } else {
            ApiService.deleteSubscription({
                email
            }).then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error)
                    setFileError(`Something went wrong!`)
            });
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
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <LinearProgress />
                        <DialogContent>
                            <DialogContentText>
                                Your email must match with the email used in service 
                                Subscription. If experienced a network issue, email us at
                                cancel-subscription@temunah.online.
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