import React, { useState, useContext } from "react"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import axios from 'axios'
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import Error from '../../Error'
import { GET_TRACKS_QUERY } from '../DashboardComponent'
import { UserContext } from '../Layout';
import { LinearProgress, ThemeProvider } from "@material-ui/core";
import theme from '../../../styles/ThemeModified'

const UpdateTrack = ({ classes, track }) => {
  const currentUser = useContext(UserContext)
  const [open, setOpen] =  useState(false)
  const [title, setTitle] =  useState(track.title)
  const [description, setDescription] =  useState(track.description)
  const [audioFile, setAudioFile] =  useState("")
  const [imageFile, setImageFile] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [fileError, setFileError] = useState("")
  
  // const isCurrentUser = track.id === track.postedBy.id
  const isPresentUser = currentUser ? currentUser.id === track.postedBy.id : null

  const handleAudioChange = event => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    const fileSizeLimit = 10000000 // 10MB
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size is too large`)
    } else {
      setAudioFile(selectedFile)
      setFileError("")
    }
  }

  const handleAvatarChange = event => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    const fileSizeLimit = 1000000 // 1.0 MB
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size is too large`)
    } else {
      setImageFile(selectedFile)
      setFileError("")
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
      data.append('resource_type', 'raw')
      data.append('upload_preset', 'temunah-music')
      data.append('cloud_name', 'apitem')
      const res = await axios.post('https://api.cloudinary.com/v1_1/apitem/image/upload', data)
      
      return res.data.url
    } catch(err) {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (event, updateTrack) => {
    event.preventDefault()
    setSubmitting(true)
    // upload our audio file, get returned url from API
    const uploadedAudioUrl = await handleAudioUplaod()
    const uploadedAvatarUrl = await handleAvatarUplaod()
    updateTrack({ variables: { 
                    trackId: track.id, 
                    title, 
                    description, 
                    url: uploadedAudioUrl, 
                    avarta: uploadedAvatarUrl 
                  } 
                })
  }

  const handleUpdateCache = async (cache, { data: {createTrack} }) => {
    const data = await cache.readQuery({ query: GET_TRACKS_QUERY })
    const tracks = await data.tracks.concat(createTrack.track)
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks} })
  }

  return isPresentUser ? (
    <>
      {/* Update Track Button */}
    
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>

      {/* Update Track Dialog */}
    <Mutation 
      mutation={UPDATE_TRACK_MUTATION}
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
      {(updateTrack, { loading, error }) => {
        if (error) return <Error error={error} />
        return (

          <Dialog open={open} className={classes.dialog}>
            <ThemeProvider theme={theme}>

              <form onSubmit={event => handleSubmit(event, updateTrack)}>
                <DialogTitle>Update Track</DialogTitle>
                <LinearProgress />
                <DialogContent>
                  <DialogContentText>
                    Add a Title, Description & Audio File (Under 10MB)
                  </DialogContentText>
                  <FormControl fullWidth>
                    <TextField
                      label="Title"
                      placeholder="Update Title"
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
                  <FormControl error={Boolean(fileError)} >
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
                      <FormHelperText>{fileError}</FormHelperText>
                    </label>
                  </FormControl>
                  <FormControl error={Boolean(fileError)} >
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
                        Avatar File
                        <AccountCircleIcon className={classes.icon} />
                      </Button>
                      {imageFile && imageFile.name}
                      <FormHelperText>{fileError}</FormHelperText>
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
                      submitting || !title.trim() || !description.trim() || !audioFile || !imageFile
                    }
                    type="submit"
                    className={classes.save}
                  >
                    {submitting ? (
                      <CircularProgress className={classes.save} size={24} />
                    ) : (
                      "Update Track"
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
  ) : null;
};

const UPDATE_TRACK_MUTATION = gql`
  mutation($trackId: Int!, $title: String, $url: String, $avarta: String, $description: String) {
    updateTrack(
      trackId: $trackId,
      title: $title,
      url: $url,
      description: $description,
      avarta: $avarta
    ){
      track {
        id
        title
        description
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
  }
});

export default withStyles(styles)(UpdateTrack);