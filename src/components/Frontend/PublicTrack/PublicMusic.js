import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles'

import  SearchTracks from '../../Dashboard/PrivateTrack/SearchTracks'
import  TrackList from './TrackList'

import Loading from '../../Auth/Loading'
import Error from '../../Error'


export const GET_TRACKS_QUERY = gql`
    query getTracksQuery {
        tracks (first: 10, skip: 1){
            id
            title
            description
            url,
            avarta,
            likes {
                id
            }
            postedBy {
                id
                username
            }
        }
    }
    `;

const Music = ({ classes }) => {
    const [searchResults, setSearchResults] = useState([])
    return (
            <div className={classes.container}>
                <SearchTracks setSearchResults={setSearchResults}/>
                <Query query={GET_TRACKS_QUERY}>
                    {({ data, loading, error }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error error={error} />
                        
                        const tracks = searchResults.length > 0 ? searchResults : data.tracks
                        return  <TrackList tracks={tracks} />
                    }}
                </Query>
            </div>
    )
}


const styles = theme => ({
    container: {
        margin: "0 auto",
        maxWidth: 960,
        padding: theme.spacing(2)
    }
})

export default withStyles(styles)(Music)

