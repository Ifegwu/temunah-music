import React, { useState, useContext }  from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { GET_TRACKS_QUERY } from '../DashboardComponent'
import { UserContext } from '../Layout';
import ConfirmDialog from './ConfirmDialog';
import styled from 'styled-components';

const DialogBackground = styled.div`
  background-color: var(--grayPro);
  padding: auto auto;
  padding-top: 8px;
  padding-left: 4px;
  padding-right: 4px;
  align-items: center;
  justify-content: center;
`

const DeleteTrack = ({ classes, track }) => {
  const currentUser = useContext(UserContext)
  const [confirmOpen, setConfirmOpen] = useState(false)
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
          <div>
            <IconButton onClick={() => setConfirmOpen(true)}>
              <TrashIcon />
            </IconButton>
            <ConfirmDialog
              title="Delete music?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deleteTrack}
            >
              <DialogBackground>
                Are you sure you want to delete '{track.title}' music?
              </DialogBackground>
            </ConfirmDialog>

          </div>
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