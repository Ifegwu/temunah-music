import React, { useState } from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

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
                        <Video
                            videoSrcURL="https://www.youtube.com/embed/J0ayPhrmgis"
                            videoTitle="Official Music Video on YouTube"
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

const Video = ({ videoSrcURL, videoTitle, classes }) => (
    <iframe
        src={videoSrcURL}
        title={videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
    />
)


const styles = theme => ({
  container: {
    height: 100,
    width: 100,
    maxHeight: 30,
    minWidth: 160,
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
    color: "red"
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