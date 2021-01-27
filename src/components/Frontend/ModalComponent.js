import React, { useState } from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import ReactPlayer from 'react-player'

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);


const WatchVedio = ({ classes, children }) => {
    const [open, setOpen] =  useState(false)

  return (
    <> 
        <StyledButton
          onClick={() => setOpen(true)}
        >
          {children}
        </StyledButton>
        <Dialog open={open} className={classes.dialog}>
            <form>
              <DialogContent>
                        <ReactPlayer 
                          url='https://www.youtube.com/watch?v=3sFzls0qY98' 
                          playing 
                          height="250" 
                          width="250px"
                        />
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.cancel}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
    </>
  );
};

const styles = theme => ({
  container: {
    height: 100,
    width: 100,
    maxHeight: 300,
    minWidth: 800,
    margin: "0 auto",
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing(1)
  },
  cancel: {
    color: "000000",
    background: "#00CFFD",
  },
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

export const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 10,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
      fontSize: 17
    },
  })(Button);

export default withStyles(styles)(WatchVedio);