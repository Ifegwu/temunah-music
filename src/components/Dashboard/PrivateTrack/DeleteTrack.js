import React, { useContext, useEffect }  from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { GET_TRACKS_QUERY } from '../DashboardComponent'
import { UserContext } from '../Layout';

const DeleteTrack = ({ track }) => {
  const currentUser = useContext(UserContext)
  
  const isPresentUser = currentUser ? currentUser.id === track.postedBy.id : null

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY })
    const index = data.tracks.findIndex(
      track => Number(track.id) === deleteTrack.trackId
    )

    // data.tracks.splice(index, 1)
    const tracks = [...data.tracks.slice(0, index), ...data.tracks.slice(index + 1)]
    
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } })
  }

  return isPresentUser ? (
      <Mutation mutation={DELETE_TRACK_MUTATION}
        variables={{ trackId: track.id }}
        onCompleted={data => {
        }}
        // refetchQueries={ () => [{ query: GET_TRACKS_QUERY}] }
        update={handleUpdateCache}
      >
        {deleteTrack => (
          <IconButton onClick={deleteTrack}>
            <TrashIcon />
          </IconButton>
        )}
      </Mutation>
    ) : null;
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`

export default DeleteTrack;