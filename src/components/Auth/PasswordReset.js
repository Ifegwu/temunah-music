import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import SettingsIcon from '@material-ui/icons/Settings';
import ApiService from "../constant/api";
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
    Slide
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from '../../styles/ThemeModified'
import { VerifiedUserTwoTone } from "@material-ui/icons";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref}/>)

const PasswordReset = ({ classes }) => {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(true);
    const [submitting, setSubmitting] = useState(false)
    const [fileError, setFileError] = useState("")
    const [error, setError] = useState(null)
    
    // Handle form submission.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.length) {
            ApiService.passwordResetInfo({
                email
            }).then(response => {
                    console.log(response.data);
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
                <SettingsIcon 
                    className={classes.save}
                />
            </IconButton>
            <Dialog open={open} className={classes.dialog}>
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Create Subscription</DialogTitle>
                        <LinearProgress />
                        <DialogContent>
                            <DialogContentText> 
                                If the email provided is correct, you will 
                                receive an email confirmation link.
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
                                <FormHelperText>{error}</FormHelperText>
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
            {/* Success Dialog */}
			<Dialog
				open={openSuccess}
				disableBackdropClick={true}
			    TransitionComponent={Transition}
            >
                <ThemeProvider theme={theme}>
                    <DialogTitle>
                        <VerifiedUserTwoTone className={classes.icon} />
                                Password Reset
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

export default withStyles(styles)(PasswordReset);