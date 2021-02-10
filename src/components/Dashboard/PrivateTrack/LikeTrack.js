import React, { useContext } from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { ME_QUERY } from '../Layout';
import { UserContext } from '../Layout';


const LikeTrack = ({ classes, trackId, likeCount  }) => {
  const currentUser = useContext(UserContext)
  const handleDisabledLikedTrack = () => {
    const userLikes = currentUser.likeSet
    const isTrackLiked = userLikes.findIndex(({ track }) => track.id === trackId) > -1
    return isTrackLiked
  }
  return (
    <Mutation 
      mutation={CREATE_LIKE_MUTATION}
      variables={{ trackId }}
      onCompleted={data => {
      }}
      refetchQueries={() => [{ query: ME_QUERY}]}
    >
      {createLike => (
        <IconButton
          onClick={event => {
            event.stopPropagation()
            createLike()
          }}
          className={classes.iconButton}
          disabled={handleDisabledLikedTrack()}
        >
          {likeCount}
          <ThumbUpIcon className={classes.color}/>
        </IconButton>
      )}
    </Mutation>
  )
};

const  CREATE_LIKE_MUTATION = gql`
  mutation($trackId: Int!) {
    createLike(trackId: $trackId) {
      track {
        id
        likes {
          id
        }
      }
    }
  }
`

const styles = theme => ({
  iconButton: {
    color: "deeppink"
  },
  icon: {
    marginLeft: theme.spacing(0.5)
  }
});

export default withStyles(styles)(LikeTrack);