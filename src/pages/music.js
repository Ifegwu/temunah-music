import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles'
import { ThemeProvider } from '@material-ui/core'

import  SearchTracks from '../components/Dashboard/PrivateTrack/SearchTracks'
import  TrackList from '../components/Dashboard/PrivateTrack/TrackList'
import  CreateTrack from '../components/Dashboard/PrivateTrack/CreateTrack'
import Updateuser from '../components/Dashboard/UpdateUser';
import Loading from '../components/Auth/Loading'
import Error from '../components/Error'
import theme from '../components/ThemeModified'
import styled from 'styled-components';
import Wrapper from '../components/Wrapper';
import ProfileUser from '../components/Dashboard/ProfileUser';

const Card = styled.div`
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
        font-size: 14px;
        font-weight: 600;
    }
`
export const GET_TRACKS_QUERY = gql`
    query getTracksQuery {
        tracks(first: 10, skip: 1) {
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
                <ProfileUser />
                <SearchTracks setSearchResults={setSearchResults}/>
                <CreateTrack />
                <Query query={GET_TRACKS_QUERY}>
                    {({ data, loading, error }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error error={error} />
                        console.log(data.tracks)
                        
                        const tracks = searchResults.length > 0 ? searchResults : data.tracks
                        return  <TrackList tracks={tracks} />
                    }}
                </Query>
                <div>
                    <ThemeProvider theme={theme}>
                        <Card>
                            <CardContent>
                                <h3>Settings</h3>
                                    <Updateuser />
                            </CardContent>
                            <CardContent>
                                <h3>Monthly Promo</h3>
                                <Wrapper />
                            </CardContent>
                        </Card>
                    </ThemeProvider>
                </div>
            </div>
    )
}


const styles = theme => ({
    container: {
        margin: "0 auto",
        maxWidth: "960",
        padding: theme.spacing(1),
        paddingTop: theme.spacing(20)
    }
})

export default withStyles(styles)(Music)

