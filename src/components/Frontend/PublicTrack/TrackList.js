import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionSummary, AccordionDetails, ThemeProvider } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import theme from '../../../styles/ThemeModified';
import AudioPlayer from './AudioPlayer'
import styled from "styled-components";
import { device } from '../FrontNav'

const Pre = styled.pre`
  display: flex;
  grid-template-columns: auto;
  padding: 4px;
  font-family: inherit;
  align-content: center;
  align-self: center;
  align-items: center;
  justify-content: center;
  justify-self: center;
  justify-items: center;

  @media ${device.mobileS} {
    font-size: 12px;
    padding: auto auto;
  }
  @media ${device.mobileM} {
    font-size: 16px;
    padding: auto auto;
  }
  @media ${device.mobileB} {
    font-size: 18x;
    padding: auto auto;
  }
`


const TrackList = ({ classes, tracks }) => (
  <List>
    <ThemeProvider theme={theme}>

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
            <Pre>
              <Typography variant="body1">
                {track.description}
              </Typography>
            </Pre>
          </AccordionDetails>
        </Accordion>
      ))}
    </ThemeProvider>
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