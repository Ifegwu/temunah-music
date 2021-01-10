import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';


import AudioPlayer from './AudioPlayer'


const TrackList = ({ classes, tracks }) => (
  <List>
    {tracks.map(track => (
      <Accordion key={track.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems="flex-end">
            <Avatar alt="avatar" src={track.avarta} />
          </Grid>
          <ListItem className={classes.root}>
            <ListItemText
              primaryTypographyProps={{
                variant: "subtitle1",
                color: "primary"
              }}
              primary={track.title}
            />
            <AudioPlayer url={track.url} />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">{track.description}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </List>
)

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
});

export default withStyles(styles)(TrackList);