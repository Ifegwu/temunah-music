import React, { useContext } from 'react'
// import { UserContext } from '../Root'
import { UserContext } from '../components/Dashboard/Layout';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Updateuser from '../components/Dashboard/UpdateUser';
import  CreateTrack from '../components/Dashboard/PrivateTrack/CreateTrack'

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
import AudiotrackIcon from "@material-ui/icons/AudiotrackTwoTone";
import Subscriptions from "@material-ui/icons/Subscriptions";
import Divider from "@material-ui/core/Divider";
import { ThemeProvider } from '@material-ui/core'

import AudioPlayer from "../components/Dashboard/PrivateTrack/AudioPlayer"
import Error from '../components/Error'
import Loading from '../components/Auth/Loading'
import { format } from 'date-fns'
import theme from '../components/ThemeModified'
import styled from 'styled-components'
import CancelSubscription from '../components/CancelSubscription';


const Cards = styled.div`
    display: flex;
    gap: 5rem;
    align-item: center;
    justify-content: center;
    justify-items: center;
    justify-selft: center;
    padding: 8px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,.07);
    padding: 4rem 4rem;
    `
const CardContent = styled.div`
    padding: 4px 4px;
    align-item: center;
    justify-content: center;
    justify-items: center;
    justify-selft: center;
    h3 {
        padding: 4px;
        padding-buttom: 4px;
        font-size: 16px;
        font-weight: 600;
    }
`
       
const Profile = ({ classes }) => {
  const currentUser = useContext(UserContext)
  console.log(currentUser)
  return (
    <Query query={PROFILE_QUERY} variables={ currentUser }>
        {({ data, loading, error }) => {
          
          if (loading) return <Loading />
          if (error) return <Error error={error} />
          console.log(data.user.id)
          
          return (
            <div className={classes.root}>
              <ThemeProvider theme={theme}>

                {/* User Info Card */}
                <CreateTrack />
                <Card className={classes.card}>
                  <CardHeader
                    avatar={<Avatar>{data.user.username[0]}</Avatar>}
                    title={data.user.username}
                    // subheader={`Joined ${format(data.user.dateJoined, 'MMM Do, YYYY')}`}
                    subheader={`Joined ${format(new Date(data.user.dateJoined), 'MMM dd, yyyy')}`}
                  />
                </Card>
                  <Cards>
                    <CardContent>
                      <h3>Settings</h3>
                      <Updateuser />
                    </CardContent>
                    <CardContent>
                      <Paper elevation={1} className={classes.paper}>
                        <Typography variant="subtitle1" className={classes.title}>
                          <Subscriptions className={classes.audioIcon} />
                          Subscriptions
                        </Typography>
                        {data.user && data.user.subscriptionsSet.map(track => (
                          <div key={track.id}>
                            <Typography>
                              {track.music} &middot; Created: {format(new Date(track.createdAt), 'MMM dd, yyyy')}
                            </Typography>
                            <Typography>
                              Amount: N{track.fee} &middot; Expires: {format(new Date(track.createdAt), 'MMM dd, yyyy')} + 30 days
                            </Typography>
                            <Divider className={classes.divider} />
                          </div>
                        ))}
                        <CancelSubscription />
                      </Paper>
                    </CardContent>
                  </Cards>
                  {/* Created Tracks */}
                  <Paper elevation={1} className={classes.paper}>
                    <Typography variant="subtitle1" className={classes.title}>
                      <AudiotrackIcon className={classes.audioIcon} />
                      Created Tracks
                    </Typography>
                    {data.user.trackSet.map(track => (
                      <div key={track.id}>
                          <Typography>
                            {track.title} &middot; {track.likes.length} likes
                          </Typography>
                          <AudioPlayer url={track.url} />
                          <Divider className={classes.divider} />
                      </div>
                    ))}
                  </Paper>
                  {/* liked Tracks */}
                  <Paper elevation={1} className={classes.paper}>
                      <Typography variant="subtitle1" className={classes.title}>
                        <ThumbUpIcon className={classes.thumbIcon} />
                        Liked Tracks
                      </Typography>
                      {data.user.likeSet.map(({ track }) => (
                        <div key={data.user.id}>
                          <Typography>
                            {track.title} &middot; {track.likes.length} Likes &middot; {track.postedBy.username}
                          </Typography>
                          <AudioPlayer url={track.url} />
                          <Divider className={classes.divider}/>
                        </div>
                      ))}
                  </Paper>
              </ThemeProvider>
            </div>
          )
        }}
      </Query>
  )

}


export const PROFILE_QUERY = gql`
  query ($id: Int!){
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          id
          title
          url
          likes {
            id
          }
          postedBy {
            id
            username
          }
        }
      }
      trackSet {
        id
        title
        url
        likes {
          id
        }
      }
      subscriptionsSet {
        id
        email
        fee
        music
        createdAt
        subscriber {
          id
        }
      }
    }
  }
`

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3)
  }, 
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(17),
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing(1)
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

export default withStyles(styles)(Profile);