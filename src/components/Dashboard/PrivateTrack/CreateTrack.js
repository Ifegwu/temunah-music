import React, { useState } from "react"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import axios from 'axios'
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import Error from '../../Error'
import Loading from "../../Auth/Loading";

import { GET_TRACKS_QUERY } from '../DashboardComponent'
import { LinearProgress, ThemeProvider } from "@material-ui/core";
import theme from '../../../styles/ThemeModified'

const CreateTrack = ({ classes }) => {
  const [open, setOpen] =  useState(false)
  const [title, setTitle] =  useState("")
  const [description, setDescription] =  useState("")
  const [audioFile, setAudioFile] =  useState("")
  const [imageFile, setImageFile] =  useState("")
  const [submitting, setSubmitting] = useState(false)
  const [audioFileError, setAudioFileError] = useState("")
  const [imageFileError, setImageFileError] = useState("")

  const handleAudioChange = event => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    const fileSizeLimit = 13000000 // 13MB
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setAudioFileError(`${selectedFile.name}: File size is too large`)
    } else {
      setAudioFile(selectedFile)
      setAudioFileError("")
    }
  }

  const handleAvatarChange = event => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    const fileSizeLimit = 100000 // 1MB
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setImageFileError(`${selectedFile.name}: File size is too large`)
    } else { 
      setImageFile(selectedFile)
      setImageFileError("")
    }
  }

  const handleAudioUplaod = async () => {
    try {
      const data = new FormData
      data.append('file', audioFile)
      data.append('resource_type', 'raw')
      data.append('upload_preset', 'temunah-music')
      data.append('cloud_name', 'apitem')
      const res = await axios.post('https://api.cloudinary.com/v1_1/apitem/raw/upload', data)
      
      return res.data.url
    } catch(err) {
      setSubmitting(false)
    }
  }

  const handleAvatarUplaod = async () => {
    try {
      const data = new FormData
      data.append('file', imageFile)
      data.append('resource_type', 'image')
      data.append('upload_preset', 'temunah-music')
      data.append('cloud_name', 'apitem')
      const res = await axios.post('https://api.cloudinary.com/v1_1/apitem/image/upload', data)
      
      return res.data.url
    } catch(err) {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (event, createTrack) => {
    event.preventDefault()
    setSubmitting(true)
    // upload our audio file, get returned url from API
    const uploadedAudioUrl = await handleAudioUplaod()
    const uploadedAvatarUrl = await handleAvatarUplaod()
    createTrack({ variables: { 
                    title, 
                    description, 
                    avarta: uploadedAvatarUrl, 
                    url: uploadedAudioUrl }
                })
  }

  const handleUpdateCache = (cache, { data: {createTrack} }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY })
    const tracks = data.tracks.concat(createTrack.track)
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks} })
  }

  return (
    <>
      {/* Create Tack Button */}
    
        <Fab
          onClick={() => setOpen(true)}
          className={classes.fab}
          color="secondary"
        >
          {open ? <ClearIcon /> : <AddIcon /> }
        </Fab>

      {/* Create Track Dialog */}
    <Mutation 
      mutation={CREATE_TRACK_MUTATION}
      onCompleted={data => {
        setSubmitting(false)
        setOpen(false)
        setTitle("")
        setDescription("")
        setAudioFile("")
        setImageFile("")
      }}  
      // refetchQueries={() => [{ query: GET_TRACKS_QUERY}]}
      update={handleUpdateCache}
    > 
      {(createTrack, { loading, error }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loading />
        return (

          <Dialog open={open} className={classes.dialog}>
            <ThemeProvider theme={theme}>

              <form onSubmit={event => handleSubmit(event, createTrack)}>
                <DialogTitle>Create Track</DialogTitle>
                <LinearProgress />
                <DialogContent>
                  <DialogContentText>
                    Add a Title, Description, Audio (under 13MB) & Image Files (under 1MB)
                  </DialogContentText>
                  <FormControl fullWidth>
                    <TextField
                      label="Title"
                      placeholder="Add Title"
                      onChange={event => setTitle(event.target.value)}
                      value={title}
                      className={classes.textField}
                    />
                    <TextField
                      multiline
                      rows="2"
                      label="Description"
                      placeholder="Add Description"
                      onChange={event => setDescription(event.target.value)}
                      value={description}
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl error={Boolean(audioFileError)} >
                    <input 
                      id="audio"
                      required
                      type="file"
                      accept="audio/mp3,audio/wav"
                      className={classes.input}
                      onChange={handleAudioChange}
                    />
                    <label htmlFor="audio">
                      <Button
                        variant="outlined"
                        color={audioFile ? "secondary" : "inherit"}
                        component="span"
                        className={classes.icon}
                      >
                        Audio File
                        <LibraryMusicIcon className={classes.icon} />
                      </Button>
                      {audioFile && audioFile.name}
                      <FormHelperText>{audioFileError}</FormHelperText>
                    </label>
                  </FormControl>
                  <FormControl error={Boolean(imageFileError)} >
                    <input 
                      id="image"
                      required
                      type="file"
                      accept="image/jpeg,png"
                      className={classes.input}
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="image">
                      <Button
                        variant="outlined"
                        color={imageFile ? "secondary" : "inherit"}
                        component="span"
                        className={classes.icon}
                      >
                        Avarta File
                        <AccountCircleIcon className={classes.icon} />
                      </Button>
                      {imageFile && imageFile.name}
                      <FormHelperText>{imageFileError}</FormHelperText>
                    </label>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={submitting}
                    className={classes.cancel}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={
                      submitting || !title.trim() || !description.trim() || !imageFile || !audioFile
                    }
                    type="submit"
                    className={classes.save}
                  >
                    {submitting ? (
                      <CircularProgress className={classes.save} size={24} />
                    ) : (
                      "Add Track"
                    )}
                  </Button>
                </DialogActions>
              </form>
            </ThemeProvider>
          </Dialog>
        )
      }}
    </Mutation>

    </>
  );
};

const CREATE_TRACK_MUTATION = gql`
  mutation ($title: String!, $description: String!, $url: String!, $avarta: String) {
    createTrack(title: $title, description: $description, url: $url, avarta: $avarta) {
      track {
        id
        title
        description
        url
        avarta
        likes {
          id
        }
        postedBy {
          id
          username
        }
      }
    }
  }
`

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing(2)
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "200",
    
  }
});

export default withStyles(styles)(CreateTrack);