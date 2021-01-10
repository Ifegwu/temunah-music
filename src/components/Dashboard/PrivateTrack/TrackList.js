import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../ThemeModified'

import { Link } from 'gatsby'
import styled from 'styled-components'

import AudioPlayer from './AudioPlayer'
import LikeTrack from './LikeTrack'
import DeleteTrack from './DeleteTrack'
import UpdateTrack from './UpdateTrack'
import { device } from '../../Frontend/FrontNav'

const AvatarLikedTracks = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-button: 8px;
  font-weight: 400

  @media ${device.mobileM} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin: 2rem auto;
    max-width: 1440px;
    align-items: center;
  }
  @media ${device.mobileS} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin: 2rem auto;
    max-width: 1440px;
    align-items: center;
  }
  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin: 2rem auto;
    max-width: 1440px;
    align-items: center;
  }
  @media ${device.mobileB} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    margin: 2rem auto;
    align-items: center;
  }
`
const GridStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr
  align-items: left;
  justify-items: left;
  justify-content: left;
  padding: 1rem;
`
const LikedStyle = styled.div`
  paddind-right: 4px;
  paddind-left: 4px;
  margin: 4px;
`
const TrackList = ({ classes, tracks, currentUser }) => (
  <ThemeProvider theme={theme}>
    <List>
      {tracks.map(track => (
        <Accordion key={track.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem className={classes.root}>
              <AvatarLikedTracks>
                <ListItemText>
                    <GridStyle>
                      <Grid container alignItems="center">
                        <Avatar src={track.avarta}/>
                      </Grid>
                    </GridStyle>
                </ListItemText>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "subtitle1",
                    color: "primary"
                  }}
                  primary={track.title}
                  secondary={
                    <Link className={ classes.link } to={`/profile/${track.postedBy.id}`}>
                      {track.postedBy.username}
                    </Link>
                  }
                />
                <LikedStyle>
                  <LikeTrack trackId={track.id} likeCount={track.likes.length} currentUser={currentUser}/>
                </LikedStyle>
                <LikedStyle>
                  <AudioPlayer url={track.url} />
                </LikedStyle>
              </AvatarLikedTracks>
          </ListItem>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">{track.description}</Typography>
        </AccordionDetails>
          <AccordionActions>
            <UpdateTrack track={track} />
            <DeleteTrack track={track} />
          </AccordionActions>
        </Accordion>
      ))}
    </List>
  </ThemeProvider>
)

const styles = theme => ({
  root: {
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