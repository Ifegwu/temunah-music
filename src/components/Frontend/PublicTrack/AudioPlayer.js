import React from "react";
import ReactPlayer from "react-player"
import withStyles from "@material-ui/core/styles/withStyles";

const AudioPlayer = ({ url, classes } ) => (
    <div className={classes.root}>
        <ReactPlayer url={url} height="30px" width="40vw" controls={true} />
    </div>
)

// export default AudioPlayer;
const styles = theme => ({
    container: {
        position: "absolute",
        margin: "0 auto",
        maxWidth: "auto",
        padding: theme.spacing(2)
    }
})

export default withStyles(styles)(AudioPlayer)