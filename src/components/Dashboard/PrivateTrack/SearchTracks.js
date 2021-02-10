import React, { useState, useRef} from "react";
import { ApolloConsumer } from "react-apollo"
import { gql } from "apollo-boost"
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { ThemeProvider } from '@material-ui/core';
import theme from '../../../styles/ThemeModified'

const SearchTracks = ({ classes, setSearchResults }) => {
  const [search, setSearch] = useState("")
  const inputEl = useRef()

  const clearSearchInput = () => {
    setSearchResults([])
    setSearch("")
    inputEl.current.focus()
  }
  
  const handleSubmit = async (event, client) => {
    event.preventDefault()
    const res = await client.query({
      query: SEARCH_TRACK_QUERY,
      variables: { search }
    })
    setSearchResults(res.data.tracks)
  }


  return (
    <ApolloConsumer>
      {client => (
        <form onSubmit={event => handleSubmit(event, client)}>
            <Paper className={classes.root} elevation={1}>
                <ThemeProvider theme={theme}>         
                  <IconButton onClick={clearSearchInput}>
                    <ClearIcon />
                  </IconButton>
                  <TextField 
                    fullWidth
                    placeholder="Search all Tracks"
                    // InputProps={{
                    //   disableUnderline: true
                    // }}
                    onChange={event => setSearch(event.target.value)}
                    value={search}
                    inputRef={inputEl}
                    id="outlined-basic" 
                    label="Search all Tracks" 
                    variant="outlined"
                  />
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
              </ThemeProvider>
            </Paper>
        </form>
      )}
    </ApolloConsumer>
  )
};

const SEARCH_TRACK_QUERY = gql`
  query($search: String) {
    tracks(search: $search) {
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
`

const styles = theme => ({
  root: {
    padding: "4px 4px",
    paddingTop: theme.spacing(4),
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  }
});

export default withStyles(styles)(SearchTracks);