import React  from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { GET_TRACKS_QUERY } from '../../../pages/music'

const DeleteTrack = ({ track }) => {
  const isCurrentUser = track.id === track.postedBy.id

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY })
    const index = data.tracks.findIndex(
      track => Number(track.id) === deleteTrack.trackId
    )

    // data.tracks.splice(index, 1)
    const tracks = [...data.tracks.slice(0, index), ...data.tracks.slice(index + 1)]
    
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } })
  }

  return isCurrentUser && (
    <Mutation mutation={DELETE_TRACK_MUTATION}
      variables={{ trackId: track.id }}
      onCompleted={data => {
        console.log(data)
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
  )
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`

export default DeleteTrack;